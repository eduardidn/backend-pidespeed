"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateMembers = exports.updateClass = exports.nextClasses = exports.getClassMembers = exports.listClassByOwner = exports.getClassByDiscipline = exports.getClass = exports.getHistory = exports.listClass = exports.createSession = exports.closeSession = exports.joinSession = exports.joinSessionAsAdmin = exports.createClass = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
function randomCode(size) {
    return crypto_1.default.randomBytes(size).toString("hex");
}
function createClass({ name, discipline, startDate, endDate, finishAndArchive, period, startHour, endHour, wichDays, selectSpecificDays, selectSpecificDates, rules, userId, institutionId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const classCreated = yield _models_1.Class.create({
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
        _utils_1.Socket.emitSocket(userId, "/class", { action: "new", object: classCreated });
        return classCreated;
    });
}
exports.createClass = createClass;
function _isModerator(userId, session) {
    return __awaiter(this, void 0, void 0, function* () {
        return session.creatorRef.toString() === userId.toString();
    });
}
function sendSessionSocket(institutionId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield _models_1.User.find({
            institutionRef: institutionId,
        }).lean();
        for (const user of users) {
            _utils_1.Socket.emitSocket(user._id, "/lesson", data);
        }
    });
}
function joinSessionAsAdmin({ sessionId, institutionId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [session, member] = yield Promise.all([
            _models_1.MeetSession.findOne({
                _id: sessionId,
                institutionRef: institutionId,
            }).lean(),
            _models_1.Member.findOne({ user: userId }).lean(),
        ]);
        if (!session)
            throw new _utils_1.HTTP400Error("Class not found");
        // const isModerator = await _isModerator(userId, session);
        const isSessionOpen = yield _utils_1.BBB.roomAlreadyOpen({
            meetingID: session.meetingID,
        });
        if (!isSessionOpen) {
            // if (!isModerator) throw new HTTP400Error("This class is not open");
            const createResponse = yield _utils_1.BBB.createRoom({
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
        const url = yield _utils_1.BBB.joinRoom({
            meetingID: session.meetingID,
            fullName: member.name,
            welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
        }, true);
        return {
            url,
        };
    });
}
exports.joinSessionAsAdmin = joinSessionAsAdmin;
function joinSession({ sessionId, institutionId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [session, member] = yield Promise.all([
            _models_1.MeetSession.findOne({
                _id: sessionId,
                institutionRef: institutionId,
            }).lean(),
            _models_1.Member.findOne({ user: userId }).lean(),
        ]);
        if (!session)
            throw new _utils_1.HTTP400Error("Class not found");
        if (session.open !== true)
            throw new _utils_1.HTTP400Error("Room is not open");
        const isSessionOpen = yield _utils_1.BBB.roomAlreadyOpen({
            meetingID: session.meetingID,
        });
        if (!isSessionOpen) {
            // if (!isModerator) throw new HTTP400Error("This class is not open");
            const createResponse = yield _utils_1.BBB.createRoom({
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
        const url = yield _utils_1.BBB.joinRoom({
            meetingID: session.meetingID,
            fullName: member.name,
            welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
        }, false);
        return {
            url,
        };
    });
}
exports.joinSession = joinSession;
function closeSession({ sessionId, institutionId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _models_1.MeetSession.findOneAndUpdate({
            _id: sessionId,
            institutionRef: institutionId,
        }, {
            open: false,
        }, {
            lean: true,
        });
        sendSessionSocket(institutionId, { action: "lesson-end" });
        return { active: false };
    });
}
exports.closeSession = closeSession;
function createSession({ classId = "", name = "", description = "", files = [], institutionId = "", userId = "", }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [session, member] = yield Promise.all([
            new _models_1.MeetSession({
                name,
                description,
                uri: randomCode(10),
                meetingID: `${randomCode(6)}-${+new Date()}`,
                institutionRef: institutionId,
                classRef: classId,
                creatorRef: userId,
            }).save(),
            _models_1.Member.findOne({ user: userId }).lean(),
        ]);
        _utils_1.Socket.emitSocket(userId, "/class", { action: "new-session" });
        sendSessionSocket(institutionId, { action: "new-lesson" });
        const createResponse = yield _utils_1.BBB.createRoom({
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
        const url = yield _utils_1.BBB.joinRoom({
            meetingID: session.meetingID,
            fullName: member.name,
            welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
        }, true);
        return {
            url,
        };
    });
}
exports.createSession = createSession;
// list all class or by an expression
function listClass(institutionId, disciplineId, value, userId, onlyFew) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = yield _models_1.Member.findOne({ user: userId })
            .populate("role")
            .select("_id")
            .lean();
        let query = {
            institutionRef: institutionId,
            discipline: disciplineId,
        };
        if (member.role.name !== "admin") {
            query = Object.assign(Object.assign({}, query), { members: member._id });
        }
        if (value) {
            query = Object.assign(Object.assign({}, query), { name: new RegExp(value, "i") });
        }
        // if is for notification
        if (onlyFew) {
            delete query.discipline;
            return _models_1.Class.find(query).select("name").lean();
        }
        const classes = yield _models_1.Class.find(query).limit(25).sort({ _id: -1 }).lean();
        return _getPhotosArray(classes);
    });
}
exports.listClass = listClass;
function getHistory(classId, institutionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.MeetSession.find({
            institutionRef: institutionId,
            classRef: classId,
        })
            .limit(25)
            .sort({ _id: -1 })
            .lean();
    });
}
exports.getHistory = getHistory;
function getClass({ id, institutionId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const classe = yield _models_1.Class.findOne({
            _id: id,
            institutionRef: institutionId,
        }).lean();
        [classe.members, classe.discipline] = yield _getPhotos({
            members: classe.members,
            discipline: classe.discipline,
        });
        return classe;
    });
}
exports.getClass = getClass;
function getClassByDiscipline(disciplineId, institutionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const classe = yield _models_1.Class.findOne({
            discipline: disciplineId,
            institutionRef: institutionId,
        }).lean();
        [classe.members, classe.discipline] = yield _getPhotos({
            members: classe.members,
            discipline: classe.discipline,
        });
        return classe;
    });
}
exports.getClassByDiscipline = getClassByDiscipline;
function listClassByOwner({ userId, institutionId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const classe = yield _models_1.Class.find({
            createdBy: userId,
            institutionRef: institutionId,
        }).lean();
        [classe.members, classe.discipline] = yield _getPhotos({
            members: classe.members,
            discipline: classe.discipline,
        });
        return classe;
    });
}
exports.listClassByOwner = listClassByOwner;
function getClassMembers({ classId, institutionId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const classe = yield _models_1.Class.find({
            _id: classId,
            institutionRef: institutionId,
        })
            .select("members")
            .lean();
        [classe.members, classe.discipline] = yield _getPhotos({
            members: classe.members,
            discipline: classe.discipline,
        });
        return classe;
    });
}
exports.getClassMembers = getClassMembers;
// get next classes
function nextClasses({ institutionId, memberId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // principal arrays
        let nextClasses = [];
        let currentClasses = [];
        // actual day
        const actualDay = dayjs_1.default().format("dddd").toLowerCase();
        const todaysDate = dayjs_1.default(dayjs_1.default().format("YYYY-MM-DD"))
            .format("YYYY-MM-DDT.Z:HH.sss[Z]")
            .replace(".-", "");
        // searching classes
        const classes = yield _models_1.Class.find({
            members: memberId,
            institutionRef: institutionId,
            startDate: { $lte: new Date() },
            endDate: { $gt: new Date() },
        }).lean();
        for (const classe of classes) {
            // principal classes variables
            const { wichDays: days, selectSpecificDays: specificDays, selectSpecificDates: specificDates, startHour: startTime, endHour: endTime, } = classe;
            // getting sdivide hours to compare
            const { startHour, startMinute, startPeriod, endHour, endMinute, endPeriod, } = _divideHours(startTime, endTime);
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
                if (currentClass)
                    currentClasses.push(classe);
                if (nextClass)
                    nextClasses.push(classe);
            }
            if (days === "mondayToFriday" && weekdays.includes(actualDay)) {
                if (currentClass)
                    currentClasses.push(classe);
                if (nextClass)
                    nextClasses.push(classe);
            }
            if (days === "chooseDays" && specificDays.includes(actualDay)) {
                if (currentClass)
                    currentClasses.push(classe);
                if (nextClass)
                    nextClasses.push(classe);
            }
            if (days === "specificDays" && specificDates.includes(todaysDate)) {
                if (currentClass)
                    currentClasses.push(classe);
                if (nextClass)
                    nextClasses.push(classe);
            }
        }
        nextClasses = yield _getPhotosArray(nextClasses);
        currentClasses = yield _getPhotosArray(currentClasses);
        return { nextClasses, currentClasses };
    });
}
exports.nextClasses = nextClasses;
// check if the class is running or if is next
function _isNextOrCurrentClass({ startHour, startMinute, startPeriod, endHour, endMinute, endPeriod }, type) {
    if (startPeriod === "PM")
        startHour = Number(startHour) + 12;
    if (endPeriod === "PM")
        endHour = Number(endHour) + 12;
    const actualDate = new Date();
    const referenceHour = Number(startHour) - 4;
    const referenceDate = new Date(`${dayjs_1.default().format("YYYY-MM-DD")} ${referenceHour}:${startMinute}`);
    const startDate = new Date(`${dayjs_1.default().format("YYYY-MM-DD")} ${startHour}:${startMinute}`);
    const endDate = new Date(`${dayjs_1.default().format("YYYY-MM-DD")} ${endHour}:${endMinute}`);
    return (actualDate >= (type ? startDate : referenceDate) &&
        actualDate < (type ? endDate : startDate));
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
function updateClass({ classId, userId, institutionId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        const membersUpdated = yield _models_1.Class.findOneAndUpdate({
            _id: classId,
            institutionRef: institutionId,
        }, value, { new: true }).populate({ path: "members" });
        [membersUpdated.members, membersUpdated.discipline] = yield _getPhotos({
            members: membersUpdated.members,
            discipline: membersUpdated.discipline,
        });
        _utils_1.Socket.emitSocket(userId, "/class", {
            action: "update",
            data: membersUpdated,
        });
        return membersUpdated;
    });
}
exports.updateClass = updateClass;
// update members in a class
function updateMembers({ userId, classId, members, institutionId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const membersUpdated = yield _models_1.Class.findOneAndUpdate({
            _id: classId,
            institutionRef: institutionId,
        }, { members }, { new: true, lean: true });
        [membersUpdated.members, membersUpdated.discipline] = yield _getPhotos({
            members: membersUpdated.members,
            discipline: membersUpdated.discipline,
        });
        _utils_1.Socket.emitSocket(userId, "/class", {
            action: "update",
            data: membersUpdated,
        });
        return membersUpdated;
    });
}
exports.updateMembers = updateMembers;
// delete class
function deleteClass({ userId, classId, institutionId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const classDeleted = yield _models_1.Class.findOneAndDelete({
            _id: classId,
            institutionRef: institutionId,
        }).exec();
        _utils_1.Socket.emitSocket(userId, "/class", {
            action: "delete",
            data: classDeleted,
        });
        return classDeleted;
    });
}
exports.deleteClass = deleteClass;
// get photos
function _getPhotos({ members, discipline }) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all([
            _getMemberPhotos(members),
            _getDisciplinePhoto(discipline),
        ]);
    });
}
// get members photos
function _getMemberPhotos(members) {
    return __awaiter(this, void 0, void 0, function* () {
        const membersPhotos = yield _models_1.Member.find({
            _id: { $in: members },
        })
            .populate("photo", "url")
            .populate("role", "name")
            .lean();
        return membersPhotos;
    });
}
// get discipline photo
function _getDisciplinePhoto(disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplinePhoto = yield _models_1.Discipline.find({
            _id: disciplineId,
        })
            .select("photo")
            .populate("photo", "url")
            .lean();
        return disciplinePhoto;
    });
}
function _getPhotosArray(classes) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(classes.map((classe) => __awaiter(this, void 0, void 0, function* () {
            return (Object.assign(Object.assign({}, classe), { members: yield _getMemberPhotos(classe.members), discipline: yield _getDisciplinePhoto(classe.discipline) }));
        })));
    });
}
