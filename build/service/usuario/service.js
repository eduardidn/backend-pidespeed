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
exports.deleteUsuario = exports.updatePassword = exports.updateUsuarioPublic = exports.updateUsuario = exports.listOne = exports.list = void 0;
const utils_1 = require("../../utils");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.find({})
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.list = list;
function listOne({ usuarioId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.findOne({ _id: usuarioId })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listOne = listOne;
function updateUsuario({ usuarioId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.findOneAndUpdate({ _id: usuarioId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateUsuario = updateUsuario;
function updateUsuarioPublic({ email, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.findOneAndUpdate({ email }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateUsuarioPublic = updateUsuarioPublic;
function updatePassword({ usuarioId, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield utils_1.PasswordHelper.encryptPassword(password);
        return utils_1.Usuario.findOneAndUpdate({ _id: usuarioId }, { password: hashPassword }, { new: true }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updatePassword = updatePassword;
function deleteUsuario(usuarioId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Usuario.findOneAndDelete({ _id: usuarioId });
    });
}
exports.deleteUsuario = deleteUsuario;
