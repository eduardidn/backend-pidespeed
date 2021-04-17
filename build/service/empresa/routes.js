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
    .get("/public/list/all/:coordenadas?", utils_1.CatchErrors(controller.listAll))
    .get("/public/home/:tipo/:sort/:ciudad?/:coordenadas?", utils_1.CatchErrors(controller.listHome))
    .get("/public/categoria/:ruta/:ciudadId?/:coordenadas?", utils_1.CatchErrors(controller.list))
    .get("/public/list/all/:empresaId/:ciudadId?/:coordenadas?", utils_1.CatchErrors(controller.listAll))
    .get("/public/one/:field/:value", utils_1.CatchErrors(controller.listOne))
    .get("/public/sucursales/:empresaId/:coordenadas?", utils_1.CatchErrors(controller.listSucursales))
    .get("/public/add-visita/:ruta", utils_1.CatchErrors(controller.addVisita))
    .get("/add-venta/:ruta", utils_1.CatchErrors(controller.addVenta))
    .post("/", utils_1.CatchErrors(controller.addEmpresa))
    .put("/:empresaId", utils_1.CatchErrors(controller.updateEmpresa))
    .delete("/:empresaId", utils_1.CatchErrors(controller.deleteEmpresa));
