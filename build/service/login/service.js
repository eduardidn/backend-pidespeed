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
exports.updateUser = exports.addUser = exports.listUserByField = exports.updatePasswordAdmin = exports.updatePasswordEmpresaDelivery = exports.updatePasswordEmpresa = exports.updatePasswordUser = exports.listEmpresaByField = exports.loginAdmin = exports.loginEmpresaDelivery = exports.loginEmpresa = exports.loginUser = void 0;
const utils_1 = require("../../utils");
/**
 * LOGINS
 */
function loginUser({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield utils_1.Usuario.findOne({
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
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = usuario;
        const match = yield utils_1.PasswordHelper.matchPassword({ password, savedPassword });
        if (!match)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const token = yield utils_1.TokenUtils.createUserToken({ userId: usuario._id });
        return { message: "ok", token, user: usuario };
    });
}
exports.loginUser = loginUser;
function loginEmpresa({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield utils_1.UsuarioEmpresa.findOne({
            $or: [{ username: user }, { email: user }],
            type: "empresa",
        })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        if (!usuario)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = usuario;
        const match = yield utils_1.PasswordHelper.compare({ password, hash: savedPassword });
        if (!match)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const company = yield utils_1.Empresa.findOne({ _id: usuario.empresa })
            .populate("categoria")
            .populate("logo")
            .populate("img")
            .populate("ciudad")
            .populate("estado");
        const token = yield utils_1.TokenUtils.createUserToken({
            userId: usuario._id,
            companyId: company._id,
            empresa: true,
            delivery: false,
        });
        const tokenEmpresa = yield utils_1.TokenUtils.createBusinessToken({
            id: usuario._id,
        });
        return {
            message: "ok",
            token,
            tokenAdmin: tokenEmpresa,
            user: usuario,
            company,
        };
    });
}
exports.loginEmpresa = loginEmpresa;
function loginEmpresaDelivery({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield utils_1.UsuarioEmpresa.findOne({
            $or: [{ username: user }, { email: user }],
            type: "delivery",
        })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        if (!usuario)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = usuario;
        const match = yield utils_1.PasswordHelper.compare({ password, hash: savedPassword });
        if (!match)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const company = yield utils_1.EmpresaDelivery.findOne({
            _id: usuario.empresaDelivery,
        })
            .populate("logo")
            .populate("ciudad")
            .populate("estado");
        const token = yield utils_1.TokenUtils.createUserToken({
            userId: usuario._id,
            companyId: company._id,
            empresa: true,
            delivery: true,
        });
        const tokenEmpresa = yield utils_1.TokenUtils.createBusinessToken({
            id: usuario._id,
        });
        return {
            message: "ok",
            token,
            tokenAdmin: tokenEmpresa,
            user: usuario,
            company,
        };
    });
}
exports.loginEmpresaDelivery = loginEmpresaDelivery;
function loginAdmin({ password, user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = yield utils_1.Admin.findOne({
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
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const { password: savedPassword } = admin;
        // const match = await PasswordHelper.matchPassword({ password, savedPassword });
        const match = yield utils_1.PasswordHelper.compare({ password, hash: savedPassword });
        if (!match)
            throw new utils_1.HTTP400Error("Usuario o contraseña incorrectos");
        const token = yield utils_1.TokenUtils.createUserToken({
            userId: admin._id,
            admin: true,
        });
        const tokenAdmin = yield utils_1.TokenUtils.createAdminToken({ id: admin._id });
        return { message: "ok", token, tokenAdmin, user: admin };
    });
}
exports.loginAdmin = loginAdmin;
/**
 * UPDATE PASSWORD
 */
function listEmpresaByField({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Empresa.findOne({ [field]: value })
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
        const hashPassword = yield utils_1.PasswordHelper.encryptPassword(password);
        return utils_1.Usuario.findOneAndUpdate({ email }, { password: hashPassword }, { new: true }).then((data) => {
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
        const hashPassword = yield utils_1.PasswordHelper.hash(password);
        return utils_1.UsuarioEmpresa.findOneAndUpdate({ [field]: value, type: "empresa" }, { password: hashPassword }, { new: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePasswordEmpresa = updatePasswordEmpresa;
function updatePasswordEmpresaDelivery({ field, value, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield utils_1.PasswordHelper.hash(password);
        return utils_1.UsuarioEmpresa.findOneAndUpdate({ [field]: value, type: "delivery" }, { password: hashPassword }, { new: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePasswordEmpresaDelivery = updatePasswordEmpresaDelivery;
function updatePasswordAdmin({ adminId, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield utils_1.PasswordHelper.hash(password);
        return utils_1.Admin.findOneAndUpdate({ _id: adminId }, { password: hashPassword }, { new: true }).then((data) => {
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
        return utils_1.Usuario.findOne({ [field]: value })
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
        value.password = yield utils_1.PasswordHelper.encryptPassword(password);
        return utils_1.Usuario.create(value);
    });
}
exports.addUser = addUser;
function updateUser({ value, usuarioId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.findOneAndUpdate({ _id: usuarioId }, { value }, { new: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateUser = updateUser;
