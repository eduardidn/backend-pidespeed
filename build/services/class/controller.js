"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateMembers = exports.updateClass = exports.nextClasses = exports.getClassMembers = exports.getClassByDiscipline = exports.getClassByOwner = exports.getClass = exports.getClassHistory = exports.listClassForNotification = exports.listClass = exports.createSession = exports.closeSession = exports.joinSession = exports.joinSessionAsAdmin = exports.createClass = void 0;
const service = __importStar(require("./service"));
const _utils_1 = require("@utils");
function createClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.user;
        const { id: institutionId } = req.institution;
        const { name, discipline, startDate, endDate, finishAndArchive, period, startHour, endHour, wichDays, selectSpecificDays, selectSpecificDates, rules, } = _utils_1.Validator.validate(req.body, "name discipline startDate endDate finishAndArchive period startHour endHour wichDays selectSpecificDays selectSpecificDates rules");
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
    });
}
exports.createClass = createClass;
function joinSessionAsAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sessionId } = _utils_1.Validator.validate(req.params, "sessionId");
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        return service
            .joinSessionAsAdmin({ sessionId, institutionId, userId })
            .then((data) => res.json(data));
    });
}
exports.joinSessionAsAdmin = joinSessionAsAdmin;
function joinSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sessionId } = _utils_1.Validator.validate(req.params, "sessionId");
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        return service
            .joinSession({ sessionId, institutionId, userId })
            .then((data) => res.json(data));
    });
}
exports.joinSession = joinSession;
function closeSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sessionId } = _utils_1.Validator.validate(req.params, "sessionId");
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        return service
            .closeSession({ sessionId, institutionId, userId })
            .then((data) => res.json(data));
    });
}
exports.closeSession = closeSession;
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { classId } = _utils_1.Validator.validate(req.params, "classId");
        const { name, description } = _utils_1.Validator.validate(req.body, "name description");
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const files = req.files;
        return service
            .createSession({ classId, name, description, files, institutionId, userId })
            .then((data) => res.json(data));
    });
}
exports.createSession = createSession;
function listClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const { value } = req.params;
        const { disciplineId } = _utils_1.Validator.validate(req.params, "disciplineId");
        return service
            .listClass(institutionId, disciplineId, value, userId)
            .then((data) => res.json(data));
    });
}
exports.listClass = listClass;
// list class for notification(few fields)
function listClassForNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const { value } = req.params;
        return service
            .listClass(institutionId, "", value, userId, true)
            .then((data) => res.json(data));
    });
}
exports.listClassForNotification = listClassForNotification;
function getClassHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { id } = _utils_1.Validator.validate(req.params, "id");
        return service
            .getHistory(id, institutionId)
            .then((data) => res.json(data));
    });
}
exports.getClassHistory = getClassHistory;
function getClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { id } = req.params;
        return service.getClass({ id, institutionId }).then((data) => res.json(data));
    });
}
exports.getClass = getClass;
function getClassByOwner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { owner: userId } = _utils_1.Validator.validate(req.params, "owner");
        return service
            .listClassByOwner({ userId, institutionId })
            .then((data) => res.json(data));
    });
}
exports.getClassByOwner = getClassByOwner;
function getClassByDiscipline(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { id } = req.params;
        return service.getClassByDiscipline(id, institutionId).then((data) => {
            res.json(data);
        });
    });
}
exports.getClassByDiscipline = getClassByDiscipline;
// get members of a class
function getClassMembers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { classId } = req.params;
        return service.getClassMembers({ classId, institutionId }).then((data) => {
            res.json(data);
        });
    });
}
exports.getClassMembers = getClassMembers;
function nextClasses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { memberId } = req.params;
        return service.nextClasses({ memberId, institutionId }).then((data) => {
            res.json(data);
        });
    });
}
exports.nextClasses = nextClasses;
// update class
function updateClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const { id: classId } = req.params;
        const { value } = _utils_1.Validator.validate(req.body, "value");
        return service
            .updateClass({ userId, classId, institutionId, value })
            .then((data) => {
            res.json(data);
        });
    });
}
exports.updateClass = updateClass;
// update members in a class
function updateMembers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const { id: classId } = req.params;
        const { members } = _utils_1.Validator.validate(req.body, "members");
        return service
            .updateMembers({ userId, classId, members, institutionId })
            .then((data) => {
            res.json(data);
        });
    });
}
exports.updateMembers = updateMembers;
// delete a class
function deleteClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: institutionId } = req.institution;
        const { userId } = req.user;
        const { id: classId } = req.params;
        return service
            .deleteClass({ userId, classId, institutionId })
            .then((data) => {
            res.json(data);
        });
    });
}
exports.deleteClass = deleteClass;
