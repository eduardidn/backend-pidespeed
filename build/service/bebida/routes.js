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
const utils_1 = require("../../utils");
exports.default = express_1.default
    .Router()
    .get("/:empresaId/:tipo/public", utils_1.CatchErrors(controller.list))
    .get("/by-ids/:ids/:tipo/public", utils_1.CatchErrors(controller.listByIds))
    .get("/list/one/:bebidaId/public", utils_1.CatchErrors(controller.listOne))
    .post("/", utils_1.CatchErrors(controller.addBebida))
    .put("/:bebidaId", utils_1.CatchErrors(controller.updateBebida))
    .delete("/:bebidaId", utils_1.CatchErrors(controller.deleteBebida));
