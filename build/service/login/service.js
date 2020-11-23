"use strict";
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
exports.updateUser = exports.addUser = exports.listUserByField = exports.updatePasswordAdmin = exports.updatePasswordEmpresa = exports.updatePasswordUser = exports.listEmpresaByField = exports.loginAdmin = exports.loginEmpresa = exports.loginUser = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
/**
 * LOGINS
 */
function loginUser({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield _models_1.Usuario.findOne({
            $or: [{ username: user }, { email: user }],
        })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        if (!usuario)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = usuario;
        const match = yield _utils_1.PasswordHelper.matchPassword({ password, savedPassword });
        if (!match)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const token = yield _utils_1.TokenUtils.createUserToken({ usuarioId: usuario._id });
        return { message: "ok", token, user: usuario };
    });
}
exports.loginUser = loginUser;
function loginEmpresa({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield _models_1.UsuarioEmpresa.findOne({
            $or: [{ username: user }, { email: user }],
        })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        if (!usuario)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = usuario;
        const match = yield _utils_1.PasswordHelper.compare({ password, hash: savedPassword });
        if (!match)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const empresa = yield _models_1.Empresa.findOne({ usuario: usuario._id })
            .populate("categoria")
            .populate("logo")
            .populate("img")
            .populate("ciudad")
            .populate("estado");
        const token = yield _utils_1.TokenUtils.createUserToken({ usuarioId: usuario._id });
        const tokenEmpresa = yield _utils_1.TokenUtils.createBusinessToken({
            id: usuario._id,
        });
        return {
            message: "ok",
            token,
            tokenAdmin: tokenEmpresa,
            user: usuario,
            empresa,
        };
    });
}
exports.loginEmpresa = loginEmpresa;
function loginAdmin({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = yield _models_1.Admin.findOne({
            $or: [{ username: user }, { email: user }],
        })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        if (!admin)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = admin;
        // const match = await PasswordHelper.matchPassword({ password, savedPassword });
        const match = yield _utils_1.PasswordHelper.compare({ password, hash: savedPassword });
        if (!match)
            throw new _utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const token = yield _utils_1.TokenUtils.createUserToken({ usuarioId: admin._id });
        const tokenAdmin = yield _utils_1.TokenUtils.createAdminToken({ id: admin._id });
        return { message: "ok", token, tokenAdmin, user: admin };
    });
}
exports.loginAdmin = loginAdmin;
/**
 * UPDATE PASSWORD
 */
function listEmpresaByField({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Empresa.findOne({ [field]: value })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listEmpresaByField = listEmpresaByField;
function updatePasswordUser({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield _utils_1.PasswordHelper.encryptPassword(password);
        return _models_1.Usuario.findOneAndUpdate({ email }, { password: hashPassword }, { new: true, lean: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePasswordUser = updatePasswordUser;
function updatePasswordEmpresa({ field, value, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield _utils_1.PasswordHelper.hash(password);
        return _models_1.UsuarioEmpresa.findOneAndUpdate({ [field]: value }, { password: hashPassword }, { new: true, lean: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePasswordEmpresa = updatePasswordEmpresa;
function updatePasswordAdmin({ adminId, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield _utils_1.PasswordHelper.hash(password);
        return _models_1.Admin.findOneAndUpdate({ _id: adminId }, { password: hashPassword }, { new: true, lean: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePasswordAdmin = updatePasswordAdmin;
/**
 * BUSQUEDA DE USUARIOS
 */
function listUserByField({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Usuario.findOne({ [field]: value })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listUserByField = listUserByField;
function addUser(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = value;
        value.password = yield _utils_1.PasswordHelper.encryptPassword(password);
        return _models_1.Usuario.create(value);
    });
}
exports.addUser = addUser;
function updateUser({ value, usuarioId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Usuario.findOneAndUpdate({ _id: usuarioId }, { value }, { new: true, lean: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateUser = updateUser;
