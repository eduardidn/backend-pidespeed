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
exports.deleteUsuario = exports.updateUsuario = exports.addUsuario = exports.listUserCompanyByField = exports.listUsuario = exports.listUsuarios = void 0;
const _utils_1 = require("@utils");
const service = __importStar(require("./service"));
function listUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.listUsuarios(req.params).then((data) => res.json(data));
    });
}
exports.listUsuarios = listUsuarios;
function listUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.listUsuario(req.params).then((data) => res.json(data));
    });
}
exports.listUsuario = listUsuario;
function listUserCompanyByField(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field, value } = _utils_1.Validator.validate(req.body, "field value");
        return service
            .listUserCompanyByField({ field, value })
            .then((data) => res.json(data));
    });
}
exports.listUserCompanyByField = listUserCompanyByField;
function addUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.addUsuario(req.body).then((data) => res.json(data));
    });
}
exports.addUsuario = addUsuario;
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = req.body;
        return service.updateUsuario({ value }).then((data) => res.json(data));
    });
}
exports.updateUsuario = updateUsuario;
function deleteUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.params;
        return service.deleteUsuario(usuarioId).then((data) => res.json(data));
    });
}
exports.deleteUsuario = deleteUsuario;
