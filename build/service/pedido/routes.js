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
    .get("/", utils_1.CatchErrors(controller.list))
    .get("/:estado", utils_1.CatchErrors(controller.listByEstado))
    .get("/list/by-usuario/:usuarioId", utils_1.CatchErrors(controller.listByUsuario))
    .get("/list/one/:pedidoId", utils_1.CatchErrors(controller.listOne))
    .get("/by-datos/:codigo/:precio", utils_1.CatchErrors(controller.listOneByDatos))
    .get("/list/by-pago/:ids", utils_1.CatchErrors(controller.listByIds))
    .post("/", utils_1.CatchErrors(controller.addPedido))
    .put("/:pedidoId", utils_1.CatchErrors(controller.updatePedido))
    .delete("/:pedidoId", utils_1.CatchErrors(controller.deletePedido));
