import * as service from "./service";
import { Validator } from "@utils";

export async function createClass(req, res) {
  const { userId } = req.user;
  const { id: institutionId } = req.institution;
  const {
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
  } = Validator.validate(
    req.body,
    "name discipline startDate endDate finishAndArchive period startHour endHour wichDays selectSpecificDays selectSpecificDates rules",
  );

  return service
    .createClass({
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
    })
    .then((data) => res.json(data));
}

export async function joinSessionAsAdmin(req, res) {
  const { sessionId } = Validator.validate(req.params, "sessionId");
  const { id: institutionId } = req.institution;
  const { userId } = req.user;

  return service
    .joinSessionAsAdmin({ sessionId, institutionId, userId })
    .then((data) => res.json(data));
}

export async function joinSession(req, res) {
  const { sessionId } = Validator.validate(req.params, "sessionId");
  const { id: institutionId } = req.institution;
  const { userId } = req.user;

  return service
    .joinSession({ sessionId, institutionId, userId })
    .then((data) => res.json(data));
}

export async function closeSession(req, res) {
  const { sessionId } = Validator.validate(req.params, "sessionId");
  const { id: institutionId } = req.institution;
  const { userId } = req.user;

  return service
    .closeSession({ sessionId, institutionId, userId })
    .then((data) => res.json(data));
}

export async function createSession(req, res) {
  const { classId } = Validator.validate(req.params, "classId");
  const { name, description } = Validator.validate(
    req.body,
    "name description",
  );
  const { id: institutionId } = req.institution;
  const { userId } = req.user;

  const files = req.files;

  return service
    .createSession({ classId, name, description, files, institutionId, userId })
    .then((data) => res.json(data));
}

export async function listClass(req, res) {
  const { id: institutionId } = req.institution;
  const { userId } = req.user;
  const { value } = req.params;
  const { disciplineId } = Validator.validate(req.params, "disciplineId");
  return service
    .listClass(institutionId, disciplineId, value, userId)
    .then((data) => res.json(data));
}

// list class for notification(few fields)
export async function listClassForNotification(req, res) {
  const { id: institutionId } = req.institution;
  const { userId } = req.user;
  const { value } = req.params;
  return service
    .listClass(institutionId, "", value, userId, true)
    .then((data) => res.json(data));
}

export async function getClassHistory(req, res) {
  const { id: institutionId } = req.institution;
  const { id } = Validator.validate(req.params, "id");

  return service
    .getHistory(id, institutionId)
    .then((data: object[]) => res.json(data));
}

export async function getClass(req, res) {
  const { id: institutionId } = req.institution;
  const { id } = req.params;
  return service.getClass({ id, institutionId }).then((data) => res.json(data));
}

export async function getClassByOwner(req, res) {
  const { id: institutionId } = req.institution;
  const { owner: userId } = Validator.validate(req.params, "owner");
  return service
    .listClassByOwner({ userId, institutionId })
    .then((data) => res.json(data));
}

export async function getClassByDiscipline(req, res) {
  const { id: institutionId } = req.institution;
  const { id } = req.params;
  return service.getClassByDiscipline(id, institutionId).then((data) => {
    res.json(data);
  });
}

// get members of a class
export async function getClassMembers(req, res) {
  const { id: institutionId } = req.institution;
  const { classId } = req.params;
  return service.getClassMembers({ classId, institutionId }).then((data) => {
    res.json(data);
  });
}

export async function nextClasses(req, res) {
  const { id: institutionId } = req.institution;
  const { memberId } = req.params;
  return service.nextClasses({ memberId, institutionId }).then((data) => {
    res.json(data);
  });
}

// update class
export async function updateClass(req, res) {
  const { id: institutionId } = req.institution;
  const { userId } = req.user;
  const { id: classId } = req.params;
  const { value } = Validator.validate(req.body, "value");

  return service
    .updateClass({ userId, classId, institutionId, value })
    .then((data) => {
      res.json(data);
    });
}

// update members in a class
export async function updateMembers(req, res) {
  const { id: institutionId } = req.institution;
  const { userId } = req.user;
  const { id: classId } = req.params;
  const { members } = Validator.validate(req.body, "members");

  return service
    .updateMembers({ userId, classId, members, institutionId })
    .then((data) => {
      res.json(data);
    });
}

// delete a class
export async function deleteClass(req, res) {
  const { id: institutionId } = req.institution;
  const { userId } = req.user;
  const { id: classId } = req.params;

  return service
    .deleteClass({ userId, classId, institutionId })
    .then((data) => {
      res.json(data);
    });
}
