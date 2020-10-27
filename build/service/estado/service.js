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
exports.deleteEstado = exports.updateEstado = exports.addEstado = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Estado.find({})
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
function listOne({ estadoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Estado.findOne({ _id: estadoId })
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
function addEstado(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Estado.create(value);
    });
}
exports.addEstado = addEstado;
function updateEstado({ estadoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Estado.findOneAndUpdate({ _id: estadoId }, value, {
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
exports.updateEstado = updateEstado;
function deleteEstado(estadoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Estado.findOneAndDelete({ _id: estadoId });
    });
}
exports.deleteEstado = deleteEstado;
