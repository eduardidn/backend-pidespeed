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
const types = {
    car: "600f87f33ba83247a488ecae",
    motorcycle: "600f88333ba83247a488ecaf",
    bike: "600f88423ba83247a488ecb0",
};
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
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(data.image);
            const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                imageBuffer,
                filename,
                folder: "usuariosEmpresa",
                update: false,
                id: null,
            });
            data.img = imageId;
        }
        if (data.vehicle_image) {
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(data.vehicle_image);
            const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                imageBuffer,
                folder: "usuariosEmpresa",
                filename,
                update: false,
                id: null,
            });
            data.img = imageId;
        }
        else
            data.vehicle_image = types[data.vehicle_type];
        if (data.type === "delivery") {
            data.empresaDelivery = data.empresa;
            delete data.empresa;
        }
        return _models_1.UsuarioEmpresa.create(data);
    });
}
exports.addUsuario = addUsuario;
function updateUsuario({ value }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (!value._id)
            throw new _utils_1.HTTP400Error("object need to have the _id");
        const userId = value._id;
        delete value._id;
        if (value.password) {
            const { password } = value;
            value.password = yield _utils_1.PasswordHelper.hash(password);
        }
        if ((_a = value.image) === null || _a === void 0 ? void 0 : _a.value) {
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(value.image);
            if (value.image.id === "600f85ce3ba83247a488ecad") {
                const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: false,
                    id: null,
                });
                value.image = imageId;
            }
            else {
                yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: true,
                    id: value.image.id,
                });
                delete value.image;
            }
        }
        if ((_b = value.vehicle_image) === null || _b === void 0 ? void 0 : _b.value) {
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(value.vehicle_image);
            if ([
                "600f87f33ba83247a488ecae",
                "600f88333ba83247a488ecaf",
                "600f88423ba83247a488ecb0",
            ].includes(value.vehicle_image.id)) {
                const { _id: imageId } = yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: false,
                    id: null,
                });
                value.vehicle_image = imageId;
            }
            else {
                yield _utils_1.UploadImage.uploadBase64({
                    imageBuffer,
                    folder: "usuariosEmpresa",
                    filename,
                    update: true,
                    id: value.vehicle_image.id,
                });
                delete value.vehicle_image;
            }
        }
        else
            value.vehicle_image = types[value.vehicle_type];
        return _models_1.UsuarioEmpresa.findOneAndUpdate({ _id: userId }, value, {
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
        if (userCompany.img !== "6018afec5ad8524648ca8216")
            yield _utils_1.UploadImage.deleteImage(userCompany.img);
        if (![
            "600f87f33ba83247a488ecae",
            "600f88333ba83247a488ecaf",
            "600f88423ba83247a488ecb0",
        ].includes(userCompany.vehicle_image))
            yield _utils_1.UploadImage.deleteImage(userCompany.vehicle_image);
        userCompany.delete();
        return userCompany;
    });
}
exports.deleteUsuario = deleteUsuario;
