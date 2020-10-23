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
exports.deleteEmpresaPedido = exports.updateEmpresaPedido = exports.addEmpresaPedido = exports.listOne = exports.listByIds = exports.listEntregados = exports.listTerminados = exports.listPendientes = exports.listAllTerminados = exports.listAllPendientes = exports.listByEmpresa = exports.listByPedido = exports.listEmpresaPedidos = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({}).lean();
    });
}
exports.list = list;
function listEmpresaPedidos({ pedidoId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({ pedido: pedidoId, empresa: empresaId }).lean();
    });
}
exports.listEmpresaPedidos = listEmpresaPedidos;
function listByPedido({ pedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({ pedido: pedidoId }).lean();
    });
}
exports.listByPedido = listByPedido;
function listByEmpresa({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({ empresa: empresaId }).lean();
    });
}
exports.listByEmpresa = listByEmpresa;
function listAllPendientes() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({ terminado: 0, entregado: 0 })
            .populate("empresa", "nombre email telefono logo")
            .sort({ date: 1 })
            .lean();
    });
}
exports.listAllPendientes = listAllPendientes;
function listAllTerminados() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({ terminado: 1, entregado: 0 })
            .populate("empresa", "nombre email telefono logo")
            .sort({ date: 1 })
            .lean();
    });
}
exports.listAllTerminados = listAllTerminados;
function listPendientes({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 0,
            entregado: 0,
        }).lean();
    });
}
exports.listPendientes = listPendientes;
function listTerminados({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 1,
            entregado: 0,
        }).lean();
    });
}
exports.listTerminados = listTerminados;
function listEntregados({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 1,
            entregado: 1,
        }).lean();
    });
}
exports.listEntregados = listEntregados;
function listByIds({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return _models_1.EmpresaPedido.find({ _id: { $in: ids } }).lean();
    });
}
exports.listByIds = listByIds;
function listOne({ empresaPedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.findOne({ _id: empresaPedidoId }).lean();
    });
}
exports.listOne = listOne;
function addEmpresaPedido(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.create(value);
    });
}
exports.addEmpresaPedido = addEmpresaPedido;
function updateEmpresaPedido({ empresaPedidoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.findOneAndUpdate({ _id: empresaPedidoId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateEmpresaPedido = updateEmpresaPedido;
function deleteEmpresaPedido(empresaPedidoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaPedido.findOneAndDelete({ _id: empresaPedidoId });
    });
}
exports.deleteEmpresaPedido = deleteEmpresaPedido;
