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
exports.deleteAfiliado = exports.updateAfiliado = exports.addAfiliado = exports.listAfiliado = exports.listAfiliados = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const service_1 = require("../file/service");
function listAfiliados({ empresaId }) {
    return _models_1.AfiliadoDelivery.find({
        empresaDelivery: empresaId,
        public: { $ne: false },
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
exports.listAfiliados = listAfiliados;
function listAfiliado({ AfiliadoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.AfiliadoDelivery.findOne({ _id: AfiliadoId })
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
exports.listAfiliado = listAfiliado;
function addAfiliado(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.image)
            throw new _utils_1.HTTP400Error("Image is required");
        const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(data);
        const { _id: imageId } = yield service_1.uploadImage({
            imageBuffer,
            folder: "AfiliadosEmpresa",
            filename,
            update: false,
            id: null,
        });
        data.img = imageId;
        return _models_1.AfiliadoDelivery.create(data);
    });
}
exports.addAfiliado = addAfiliado;
function updateAfiliado({ AfiliadoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (value.image) {
            const { imageBuffer, filename } = _utils_1.UploadImage.getImgData(value);
            yield service_1.uploadImage({
                imageBuffer,
                folder: "AfiliadosEmpresa",
                filename,
                update: true,
                id: value.img,
            });
        }
        return _models_1.AfiliadoDelivery.findOneAndUpdate({ _id: AfiliadoId }, value, {
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
exports.updateAfiliado = updateAfiliado;
function deleteAfiliado(AfiliadoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.AfiliadoDelivery.findOneAndDelete({ _id: AfiliadoId });
    });
}
exports.deleteAfiliado = deleteAfiliado;
