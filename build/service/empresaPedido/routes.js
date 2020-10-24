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
    .get("/", _utils_1.CatchErrors(controller.list))
    .get("/byEmpresaByPedido/:pedidoId/:empresaId", _utils_1.CatchErrors(controller.listEmpresaPedidos))
    .get("/byPedido/:pedidoId", _utils_1.CatchErrors(controller.listByPedido))
    .get("/byEmpresa/:EmpresaId", _utils_1.CatchErrors(controller.listByEmpresa))
    .get("/todos/pendientes", _utils_1.CatchErrors(controller.listAllPendientes))
    .get("/todos/terminados", _utils_1.CatchErrors(controller.listAllTerminados))
    .get("/pendientes/:empresaId", _utils_1.CatchErrors(controller.listPendientes))
    .get("/terminados/:empresaId", _utils_1.CatchErrors(controller.listTerminados))
    .get("/entregados/:empresaId", _utils_1.CatchErrors(controller.listEntregados))
    .get("/list/byPago/:ids", _utils_1.CatchErrors(controller.listByIds))
    .get("/:empresaPedidoId", _utils_1.CatchErrors(controller.listOne))
    .post("/", _utils_1.CatchErrors(controller.addEmpresaPedido))
    .put("/:empresaPedidoId", _utils_1.CatchErrors(controller.updateEmpresaPedido))
    .delete("/:empresaPedidoId", _utils_1.CatchErrors(controller.deleteEmpresaPedido));
