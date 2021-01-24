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
exports.deleteUsuario = exports.updateUsuario = exports.addUsuario = exports.listUserCompanyByField = exports.listUsuario = exports.listUsuarios = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
function listUsuarios({ empresaId, type }) {
    return _models_1.UsuarioEmpresa.find({
        $or: [{ empresa: empresaId }, { empresaDelivery: empresaId }],
        type,
    })
        .populate("img")
        .lean()
        .then((datos) => datos.map((data) => {
        if (data) {
            data.id = data._id;
            return data;
        }
    }));
}
exports.listUsuarios = listUsuarios;
function listUsuario({ usuarioId, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.UsuarioEmpresa.findOne({ _id: usuarioId, type })
            .populate("img")
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listUsuario = listUsuario;
function listUserCompanyByField({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.UsuarioEmpresa.findOne({ [field]: value })
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listUserCompanyByField = listUserCompanyByField;
function addUsuario(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = data;
        data.password = yield _utils_1.PasswordHelper.hash(password);
        if (data.image) {
            const { filetype: type, filename, value } = data.image;
            const image = Buffer.from(value, "base64");
            const imageBuffer = {
                type,
                image,
            };
            const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                imageBuffer,
                folder: "usuariosEmpresa",
                filename,
                update: false,
                id: null,
            });
            data.img = imageId;
        }
        if (data.vehicle_image) {
            const { filetype: type, filename, value } = data.vehicle_image;
            const image = Buffer.from(value, "base64");
            const imageBuffer = {
                type,
                image,
            };
            const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                imageBuffer,
                folder: "usuariosEmpresa",
                filename,
                update: false,
                id: null,
            });
            data.img = imageId;
        }
        if (data.type === "delivery") {
            data.empresaDelivery = data.empresa;
            delete data.empresa;
        }
        return _models_1.UsuarioEmpresa.create(data);
    });
}
exports.addUsuario = addUsuario;
function updateUsuario({ usuarioId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (value.image) {
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(value);
            if (value.img === "5fa5b4bdb6dac50570af1a1b") {
                const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: false,
                    id: null,
                });
                value.img = imageId;
            }
            else {
                yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: true,
                    id: value.img,
                });
            }
        }
        return _models_1.UsuarioEmpresa.findOneAndUpdate({ _id: usuarioId }, value, {
            new: true,
            lean: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateUsuario = updateUsuario;
function deleteUsuario(usuarioId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCompany = yield _models_1.UsuarioEmpresa.findOne({ _id: usuarioId });
        if (userCompany.img !== "5fa5b4bdb6dac50570af1a1b")
            yield _utils_1.UploadImage.deleteImage(userCompany.img);
        userCompany.delete();
        return userCompany;
    });
}
exports.deleteUsuario = deleteUsuario;
