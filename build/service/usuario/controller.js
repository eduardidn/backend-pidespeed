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
exports.deleteUsuario = exports.updatePassword = exports.updateUsuarioPublic = exports.updateUsuario = exports.listOneById = exports.listOne = exports.list = void 0;
const _utils_1 = require("@utils");
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.list().then((data) => res.json(data));
    });
}
exports.list = list;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.user;
        return service.listOne({ usuarioId }).then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function listOneById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.params;
        return service.listOne({ usuarioId }).then((data) => res.json(data));
    });
}
exports.listOneById = listOneById;
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.user;
        const value = req.body;
        return service
            .updateUsuario({ usuarioId, value })
            .then((data) => res.json(data));
    });
}
exports.updateUsuario = updateUsuario;
function updateUsuarioPublic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        const value = req.body;
        return service
            .updateUsuarioPublic({ email, value })
            .then((data) => res.json(data));
    });
}
exports.updateUsuarioPublic = updateUsuarioPublic;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, usuarioId } = _utils_1.Validator.validate(req.body, "password");
        return service
            .updatePassword({ usuarioId, password })
            .then((data) => res.json(data));
    });
}
exports.updatePassword = updatePassword;
function deleteUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.user;
        return service.deleteUsuario(usuarioId).then((data) => res.json(data));
    });
}
exports.deleteUsuario = deleteUsuario;
