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
exports.deletePago = exports.updatePago = exports.addPago = exports.listOne = exports.listAll = exports.list = void 0;
const _models_1 = require("@models");
function list({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.find({ empresa: empresaId })
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
function listAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.find({})
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listAll = listAll;
function listOne({ pagoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.findOne({ _id: pagoId })
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
function addPago(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.create(value);
    });
}
exports.addPago = addPago;
function updatePago({ pagoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.findOneAndUpdate({ _id: pagoId }, value, {
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
exports.updatePago = updatePago;
function deletePago(pagoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pago.findOneAndDelete({ _id: pagoId });
    });
}
exports.deletePago = deletePago;
