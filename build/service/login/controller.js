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
exports.updateUser = exports.addUser = exports.listUserByField = exports.updatePasswordAdmin = exports.updatePasswordEmpresaDelivery = exports.updatePasswordEmpresa = exports.updatePasswordUser = exports.listEmpresaByField = exports.loginAdmin = exports.loginEmpresaDelivery = exports.loginEmpresa = exports.loginUser = void 0;
const utils_1 = require("../../utils");
const service = __importStar(require("./service"));
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, password } = utils_1.Validator.validate(req.body, "user password");
        return service.loginUser({ user, password }).then((data) => res.json(data));
    });
}
exports.loginUser = loginUser;
function loginEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, password } = utils_1.Validator.validate(req.body, "user password");
        return service
            .loginEmpresa({ user, password })
            .then((data) => res.json(data));
    });
}
exports.loginEmpresa = loginEmpresa;
function loginEmpresaDelivery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, password } = utils_1.Validator.validate(req.body, "user password");
        return service
            .loginEmpresaDelivery({ user, password })
            .then((data) => res.json(data));
    });
}
exports.loginEmpresaDelivery = loginEmpresaDelivery;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, password } = utils_1.Validator.validate(req.body, "user password");
        return service.loginAdmin({ user, password }).then((data) => res.json(data));
    });
}
exports.loginAdmin = loginAdmin;
/**
 * UPDATE PASSWORD
 */
function listEmpresaByField(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field, value } = utils_1.Validator.validate(req.body, "field value");
        return service
            .listEmpresaByField({ field, value })
            .then((data) => res.json(data));
    });
}
exports.listEmpresaByField = listEmpresaByField;
function updatePasswordUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, email } = utils_1.Validator.validate(req.body, "password");
        return service
            .updatePasswordUser({ email, password })
            .then((data) => res.json(data));
    });
}
exports.updatePasswordUser = updatePasswordUser;
function updatePasswordEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, field, value } = utils_1.Validator.validate(req.body, "password");
        return service
            .updatePasswordEmpresa({ field, value, password })
            .then((data) => res.json(data));
    });
}
exports.updatePasswordEmpresa = updatePasswordEmpresa;
function updatePasswordEmpresaDelivery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, field, value } = utils_1.Validator.validate(req.body, "password");
        return service
            .updatePasswordEmpresaDelivery({ field, value, password })
            .then((data) => res.json(data));
    });
}
exports.updatePasswordEmpresaDelivery = updatePasswordEmpresaDelivery;
function updatePasswordAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, adminId } = utils_1.Validator.validate(req.body, "password");
        return service
            .updatePasswordAdmin({ adminId, password })
            .then((data) => res.json(data));
    });
}
exports.updatePasswordAdmin = updatePasswordAdmin;
/**
 * USUARIOS
 */
function listUserByField(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field, value } = utils_1.Validator.validate(req.body, "field value");
        return service
            .listUserByField({ field, value })
            .then((data) => res.json(data));
    });
}
exports.listUserByField = listUserByField;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.addUser(req.body).then((data) => res.json(data));
    });
}
exports.addUser = addUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.params;
        const value = req.body;
        return service
            .updateUser({ usuarioId, value })
            .then((data) => res.json(data));
    });
}
exports.updateUser = updateUser;
