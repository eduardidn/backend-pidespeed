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
exports.deletePedido = exports.updatePedido = exports.addPedido = exports.listOne = exports.listOneByDatos = exports.listByIds = exports.listByUsuario = exports.listByEstado = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.find()
            .populate("file", "url")
            .sort({ _id: -1 })
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
function listByEstado({ estado }) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = {};
        if (estado === "por-aprobar")
            query = Object.assign(Object.assign({}, query), { aprobado: 0, cancelado: 0 });
        if (estado === "terminados")
            query = Object.assign(Object.assign({}, query), { aprobado: 0, terminado: 0, cancelado: 0 });
        if (estado === "cancelados")
            query = Object.assign(Object.assign({}, query), { cancelado: 1 });
        return _models_1.Pedido.find(query)
            .populate("file", "url")
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByEstado = listByEstado;
function listByUsuario({ usuarioId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.find({ usuario: usuarioId })
            .populate("file", "url")
            .sort({ _id: -1 })
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listByUsuario = listByUsuario;
function listByIds({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return _models_1.Pedido.find({ _id: { $in: ids } })
            .populate("file", "url")
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listByIds = listByIds;
function listOneByDatos({ codigo, precio }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.find({ codigo, precio })
            .populate("file", "url")
            .sort({ _id: -1 })
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listOneByDatos = listOneByDatos;
function listOne({ pedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.findOne({ _id: pedidoId })
            .populate("file", "url")
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
function addPedido(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.create(value);
    });
}
exports.addPedido = addPedido;
function updatePedido({ pedidoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.findOneAndUpdate({ _id: pedidoId }, value, {
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
exports.updatePedido = updatePedido;
function deletePedido(pedidoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Pedido.findOneAndDelete({ _id: pedidoId });
    });
}
exports.deletePedido = deletePedido;
