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
exports.deleteDetallePedido = exports.updateDetallePedido = exports.addDetallePedido = exports.listOne = exports.listByPedido = exports.listPedidos = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.find({}).lean();
    });
}
exports.list = list;
function listPedidos({ pedidoId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.find({ pedido: pedidoId, empresa: empresaId }).lean();
    });
}
exports.listPedidos = listPedidos;
function listByPedido({ pedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.find({ pedido: pedidoId }).lean();
    });
}
exports.listByPedido = listByPedido;
function listOne({ detallePedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.findOne({ _id: detallePedidoId }).lean();
    });
}
exports.listOne = listOne;
function addDetallePedido(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.create(value);
    });
}
exports.addDetallePedido = addDetallePedido;
function updateDetallePedido({ detallePedidoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.findOneAndUpdate({ _id: detallePedidoId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateDetallePedido = updateDetallePedido;
function deleteDetallePedido(detallePedidoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.DetallePedido.findOneAndDelete({ _id: detallePedidoId });
    });
}
exports.deleteDetallePedido = deleteDetallePedido;
