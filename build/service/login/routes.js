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
    .put("/set-password-empresa", _utils_1.CatchErrors(controller.updatePasswordEmpresa))
    .post("/create-user", _utils_1.CatchErrors(controller.addUser))
    .post("/buscar-user-field", _utils_1.CatchErrors(controller.listUserByField))
    .post("/buscar-empresa-field", _utils_1.CatchErrors(controller.listEmpresaByField))
    .put("/recuperar-password", _utils_1.CatchErrors(controller.updatePasswordUser))
    .put("/recuperar-password-empresa", _utils_1.CatchErrors(controller.updatePasswordEmpresa))
    .put("/recuperar-password-admin", _utils_1.CatchErrors(controller.updatePasswordAdmin))
    .put("/set-password-empresa", _utils_1.CatchErrors(controller.updatePasswordEmpresa))
    .post("/login-user/", _utils_1.CatchErrors(controller.loginUser))
    .post("/login-empresa", _utils_1.CatchErrors(controller.loginEmpresa))
    .post("/login-admin", _utils_1.CatchErrors(controller.loginAdmin));
/**
 * @@deprecated
 */
/* .post('/buscarUserEmail/completo', CatchErrors(controller.buscarUserByEmail))
.get('/buscarEmpresaEmail/:email', CatchErrors(controller.buscarEmpresaEmail))
.post('/promocion', CatchErrors(controller.mailPromocion))
.post('/buscarUserUsername', CatchErrors(controller.buscarUserUsername))
.post('/buscarEmpresaUsername', CatchErrors(controller.buscarEmpresaUsername))
.post('/buscarUserTelefono', CatchErrors(controller.buscarUserTelefono))
.post('/buscarUserCedula', CatchErrors(controller.buscarUserCedula)) */
