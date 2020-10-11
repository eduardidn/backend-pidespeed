import {
  Class,
  Discipline,
  Institution,
  MeetSession,
  Member,
  User,
} from "@models";
import { Socket, BBB, HTTP400Error } from "@utils";

import crypto from "crypto";

import dayjs from "dayjs";
import { promises } from "fs";

const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

function randomCode(size): string {
  return crypto.randomBytes(size).toString("hex");
}

export async function createClass({
  name,
  discipline,
  startDate,
  endDate,
  finishAndArchive,
  period,
  startHour,
  endHour,
  wichDays,
  selectSpecificDays,
  selectSpecificDates,
  rules,
  userId,
  institutionId,
}) {
  const classCreated = await Class.create({
    name,
    discipline,
    startDate,
    endDate,
    finishAndArchive,
    period,
    startHour,
    endHour,
    wichDays,
    selectSpecificDays,
    selectSpecificDates,
    rules,
    createdBy: userId,
    institutionRef: institutionId,
  });
  Socket.emitSocket(userId, "/class", { action: "new", object: classCreated });
  return classCreated;
}

async function _isModerator(userId, session) {
  return session.creatorRef.toString() === userId.toString();
}

async function sendSessionSocket(
  institutionId: string,
  data: any,
): Promise<void> {
  const users = await User.find({
    institutionRef: institutionId,
  }).lean();

  for (const user of users) {
    Socket.emitSocket(user._id, "/lesson", data);
  }
}

export async function joinSessionAsAdmin({ sessionId, institutionId, userId }) {
  const [session, member] = await Promise.all([
    MeetSession.findOne({
      _id: sessionId,
      institutionRef: institutionId,
    }).lean(),
    Member.findOne({ user: userId }).lean(),
  ]);
  if (!session) throw new HTTP400Error("Class not found");

  // const isModerator = await _isModerator(userId, session);

  const isSessionOpen = await BBB.roomAlreadyOpen({
    meetingID: session.meetingID,
  });

  if (!isSessionOpen) {
    // if (!isModerator) throw new HTTP400Error("This class is not open");
    const createResponse = await BBB.createRoom({
      meetingID: session.meetingID,
      name: session.name,
      record: true,
      allowStartStopRecording: true,
      welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    });

    if (!createResponse) {
      return {
        session: true,
        meet: false,
      };
    }
  }

  const url = await BBB.joinRoom(
    {
      meetingID: session.meetingID,
      fullName: member.name,
      welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    },
    true,
  );

  return {
    url,
  };
}

export async function joinSession({ sessionId, institutionId, userId }) {
  const [session, member] = await Promise.all([
    MeetSession.findOne({
      _id: sessionId,
      institutionRef: institutionId,
    }).lean(),
    Member.findOne({ user: userId }).lean(),
  ]);
  if (!session) throw new HTTP400Error("Class not found");

  if (session.open !== true) throw new HTTP400Error("Room is not open");

  const isSessionOpen = await BBB.roomAlreadyOpen({
    meetingID: session.meetingID,
  });

  if (!isSessionOpen) {
    // if (!isModerator) throw new HTTP400Error("This class is not open");
    const createResponse = await BBB.createRoom({
      meetingID: session.meetingID,
      name: session.name,
      record: true,
      allowStartStopRecording: true,
      welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    });

    if (!createResponse) {
      return {
        session: true,
        meet: false,
      };
    }
  }

  const url = await BBB.joinRoom(
    {
      meetingID: session.meetingID,
      fullName: member.name,
      welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    },
    false,
  );

  return {
    url,
  };
}

export async function closeSession({ sessionId, institutionId, userId }) {
  await MeetSession.findOneAndUpdate(
    {
      _id: sessionId,
      institutionRef: institutionId,
    },
    {
      open: false,
    },
    {
      lean: true,
    },
  );
  sendSessionSocket(institutionId, { action: "lesson-end" });

  return { active: false };
}

export async function createSession({
  classId = "",
  name = "",
  description = "",
  files = [],
  institutionId = "",
  userId = "",
}): Promise<any> {
  const [session, member] = await Promise.all([
    new MeetSession({
      name,
      description,
      uri: randomCode(10),
      meetingID: `${randomCode(6)}-${+new Date()}`,
      institutionRef: institutionId,
      classRef: classId,
      creatorRef: userId,
    }).save(),
    Member.findOne({ user: userId }).lean(),
  ]);

  Socket.emitSocket(userId, "/class", { action: "new-session" });
  sendSessionSocket(institutionId, { action: "new-lesson" });

  const createResponse = await BBB.createRoom({
    meetingID: session.meetingID,
    name: session.name,
    record: true,
    allowStartStopRecording: true,
    welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
  });

  if (!createResponse) {
    return {
      session: true,
      meet: false,
    };
  }

  const url = await BBB.joinRoom(
    {
      meetingID: session.meetingID,
      fullName: member.name,
      welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    },
    true,
  );

  return {
    url,
  };
}

// list all class or by an expression
export async function listClass(
  institutionId,
  disciplineId,
  value,
  userId,
  onlyFew?,
): Promise<any> {
  const member = await Member.findOne({ user: userId })
    .populate("role")
    .select("_id")
    .lean();

  let query: any = {
    institutionRef: institutionId,
    discipline: disciplineId,
  };

  if (member.role.name !== "admin") {
    query = {
      ...query,
      members: member._id,
    };
  }
  if (value) {
    query = {
      ...query,
      name: new RegExp(value, "i"),
    };
  }
  // if is for notification
  if (onlyFew) {
    delete query.discipline;
    return Class.find(query).select("name").lean();
  }

  const classes = await Class.find(query).limit(25).sort({ _id: -1 }).lean();

  return _getPhotosArray(classes);
}

export async function getHistory(classId, institutionId): Promise<any> {
  return MeetSession.find({
    institutionRef: institutionId,
    classRef: classId,
  })
    .limit(25)
    .sort({ _id: -1 })
    .lean();
}

export async function getClass({ id, institutionId }) {
  const classe = await Class.findOne({
    _id: id,
    institutionRef: institutionId,
  }).lean();
  [classe.members, classe.discipline] = await _getPhotos({
    members: classe.members,
    discipline: classe.discipline,
  });
  return classe;
}

export async function getClassByDiscipline(disciplineId, institutionId) {
  const classe = await Class.findOne({
    discipline: disciplineId,
    institutionRef: institutionId,
  }).lean();

  [classe.members, classe.discipline] = await _getPhotos({
    members: classe.members,
    discipline: classe.discipline,
  });
  return classe;
}

export async function listClassByOwner({ userId, institutionId }) {
  const classe = await Class.find({
    createdBy: userId,
    institutionRef: institutionId,
  }).lean();

  [classe.members, classe.discipline] = await _getPhotos({
    members: classe.members,
    discipline: classe.discipline,
  });
  return classe;
}

export async function getClassMembers({ classId, institutionId }) {
  const classe = await Class.find({
    _id: classId,
    institutionRef: institutionId,
  })
    .select("members")
    .lean();

  [classe.members, classe.discipline] = await _getPhotos({
    members: classe.members,
    discipline: classe.discipline,
  });
  return classe;
}

// get next classes
export async function nextClasses({ institutionId, memberId }) {
  // principal arrays
  let nextClasses = [];
  let currentClasses = [];
  // actual day
  const actualDay = dayjs().format("dddd").toLowerCase();
  const todaysDate = dayjs(dayjs().format("YYYY-MM-DD"))
    .format("YYYY-MM-DDT.Z:HH.sss[Z]")
    .replace(".-", "");
  // searching classes
  const classes = await Class.find({
    members: memberId,
    institutionRef: institutionId,
    startDate: { $lte: new Date() },
    endDate: { $gt: new Date() },
  }).lean();

  for (const classe of classes) {
    // principal classes variables
    const {
      wichDays: days,
      selectSpecificDays: specificDays,
      selectSpecificDates: specificDates,
      startHour: startTime,
      endHour: endTime,
    } = classe;
    // getting sdivide hours to compare
    const {
      startHour,
      startMinute,
      startPeriod,
      endHour,
      endMinute,
      endPeriod,
    } = _divideHours(startTime, endTime);

    const time = {
      startHour,
      startMinute,
      startPeriod,
      endHour,
      endMinute,
      endPeriod,
    };

    // check if the class is near or if is running
    const currentClass = _isNextOrCurrentClass(time, "current");
    const nextClass = _isNextOrCurrentClass(time, null);

    // class possibilities
    if (days === "allDays") {
      if (currentClass) currentClasses.push(classe);
      if (nextClass) nextClasses.push(classe);
    }
    if (days === "mondayToFriday" && weekdays.includes(actualDay)) {
      if (currentClass) currentClasses.push(classe);
      if (nextClass) nextClasses.push(classe);
    }
    if (days === "chooseDays" && specificDays.includes(actualDay)) {
      if (currentClass) currentClasses.push(classe);
      if (nextClass) nextClasses.push(classe);
    }
    if (days === "specificDays" && specificDates.includes(todaysDate)) {
      if (currentClass) currentClasses.push(classe);
      if (nextClass) nextClasses.push(classe);
    }
  }

  nextClasses = await _getPhotosArray(nextClasses);
  currentClasses = await _getPhotosArray(currentClasses);
  return { nextClasses, currentClasses };
}

// check if the class is running or if is next
function _isNextOrCurrentClass(
  { startHour, startMinute, startPeriod, endHour, endMinute, endPeriod },
  type,
) {
  if (startPeriod === "PM") startHour = Number(startHour) + 12;
  if (endPeriod === "PM") endHour = Number(endHour) + 12;

  const actualDate = new Date();
  const referenceHour = Number(startHour) - 4;
  const referenceDate = new Date(
    `${dayjs().format("YYYY-MM-DD")} ${referenceHour}:${startMinute}`,
  );
  const startDate = new Date(
    `${dayjs().format("YYYY-MM-DD")} ${startHour}:${startMinute}`,
  );
  const endDate = new Date(
    `${dayjs().format("YYYY-MM-DD")} ${endHour}:${endMinute}`,
  );
  return (
    actualDate >= (type ? startDate : referenceDate) &&
    actualDate < (type ? endDate : startDate)
  );
}

// divide time to hours, minutes and period
function _divideHours(startTime, endTime) {
  const divide = (str) => {
    const [hour, minute, _period] = str.split(":");
    const [, period] = _period.split(" ");
    return [hour, minute, period];
  };
  const [startHour, startMinute, startPeriod] = divide(startTime);
  const [endHour, endMinute, endPeriod] = divide(endTime);

  return {
    startHour,
    startMinute,
    startPeriod,
    endHour,
    endMinute,
    endPeriod,
  };
}

// update class
export async function updateClass({ classId, userId, institutionId, value }) {
  const membersUpdated = await Class.findOneAndUpdate(
    {
      _id: classId,
      institutionRef: institutionId,
    },
    value,
    { new: true },
  ).populate({ path: "members" });

  [membersUpdated.members, membersUpdated.discipline] = await _getPhotos({
    members: membersUpdated.members,
    discipline: membersUpdated.discipline,
  });

  Socket.emitSocket(userId, "/class", {
    action: "update",
    data: membersUpdated,
  });

  return membersUpdated;
}

// update members in a class

export async function updateMembers({
  userId,
  classId,
  members,
  institutionId,
}) {
  const membersUpdated = await Class.findOneAndUpdate(
    {
      _id: classId,
      institutionRef: institutionId,
    },
    { members },
    { new: true, lean: true },
  );

  [membersUpdated.members, membersUpdated.discipline] = await _getPhotos({
    members: membersUpdated.members,
    discipline: membersUpdated.discipline,
  });

  Socket.emitSocket(userId, "/class", {
    action: "update",
    data: membersUpdated,
  });

  return membersUpdated;
}

// delete class
export async function deleteClass({ userId, classId, institutionId }) {
  const classDeleted = await Class.findOneAndDelete({
    _id: classId,
    institutionRef: institutionId,
  }).exec();

  Socket.emitSocket(userId, "/class", {
    action: "delete",
    data: classDeleted,
  });

  return classDeleted;
}

// get photos
async function _getPhotos({ members, discipline }) {
  return Promise.all([
    _getMemberPhotos(members),
    _getDisciplinePhoto(discipline),
  ]);
}
// get members photos
async function _getMemberPhotos(members) {
  const membersPhotos = await Member.find({
    _id: { $in: members },
  })
    .populate("photo", "url")
    .populate("role", "name")
    .lean();

  return membersPhotos;
}

// get discipline photo
async function _getDisciplinePhoto(disciplineId) {
  const disciplinePhoto = await Discipline.find({
    _id: disciplineId,
  })
    .select("photo")
    .populate("photo", "url")
    .lean();

  return disciplinePhoto;
}

async function _getPhotosArray(classes) {
  return Promise.all(
    classes.map(async (classe) => ({
      ...classe,
      members: await _getMemberPhotos(classe.members),
      discipline: await _getDisciplinePhoto(classe.discipline),
    })),
  );
}
