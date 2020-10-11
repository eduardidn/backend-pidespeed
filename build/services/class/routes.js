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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("./controller"));
const _utils_1 = require("@utils");
exports.default = express_1.default
    .Router()
    .get("/classes/:disciplineId/:value?", _utils_1.CatchErrors(controller.listClass))
    .get("/class/notification/:value?", _utils_1.CatchErrors(controller.listClassForNotification))
    .get("/class/history/:id", _utils_1.CatchErrors(controller.getClassHistory))
    .get("/class/:id", _utils_1.CatchErrors(controller.getClass))
    .get("/class/:owner", _utils_1.CatchErrors(controller.getClassByOwner))
    .get("/class/discipline/:id", _utils_1.CatchErrors(controller.getClassByOwner))
    .get("/class/members/:classId", _utils_1.CatchErrors(controller.getClassMembers))
    .get("/class/next/:memberId", _utils_1.CatchErrors(controller.nextClasses))
    .post("/class", _utils_1.CatchErrors(controller.createClass))
    .post("/class/session/join/admin/:sessionId", _utils_1.CatchErrors(controller.joinSessionAsAdmin))
    .post("/class/session/join/:sessionId", _utils_1.CatchErrors(controller.joinSession))
    .post("/class/session/close/:sessionId", _utils_1.CatchErrors(controller.closeSession))
    .post("/class/session/:classId", _utils_1.CatchErrors(controller.createSession))
    .patch("/class/:id/member", _utils_1.CatchErrors(controller.updateMembers))
    .patch("/class/:id", _utils_1.CatchErrors(controller.updateClass))
    .delete("/class/:id", _utils_1.CatchErrors(controller.deleteClass));
