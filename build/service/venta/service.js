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
exports.deleteVenta = exports.updateVenta = exports.addVenta = exports.listOne = exports.listByIds = exports.listNoPagados = exports.listAll = exports.list = void 0;
const _models_1 = require("@models");
function list({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.find({ empresa: empresaId })
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
        return _models_1.Venta.find({})
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
function listNoPagados({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.find({ empresa: empresaId, pagado: 0 })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listNoPagados = listNoPagados;
function listByIds({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return _models_1.Venta.find({ _id: { $in: ids } })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByIds = listByIds;
function listOne({ ventaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.findOne({ _id: ventaId })
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
function addVenta(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.create(value);
    });
}
exports.addVenta = addVenta;
function updateVenta({ ventaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.findOneAndUpdate({ _id: ventaId }, value, {
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
exports.updateVenta = updateVenta;
function deleteVenta(ventaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Venta.findOneAndDelete({ _id: ventaId });
    });
}
exports.deleteVenta = deleteVenta;
