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
const utils_1 = require("../../utils");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({})
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
function listEmpresaPedidos({ pedidoId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({ pedido: pedidoId, empresa: empresaId })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listEmpresaPedidos = listEmpresaPedidos;
function listByPedido({ pedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({ pedido: pedidoId })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByPedido = listByPedido;
function listByEmpresa({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({ empresa: empresaId })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByEmpresa = listByEmpresa;
function listAllPendientes() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({ terminado: 0, entregado: 0 })
            .populate({
            path: "empresa",
            select: "nombre email telefono logo",
            populate: { path: "logo", select: "url" },
        })
            .sort({ date: 1 })
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listAllPendientes = listAllPendientes;
function listAllTerminados() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({ terminado: 1, entregado: 0 })
            .populate({
            path: "empresa",
            select: "nombre email telefono logo",
            populate: { path: "logo", select: "url" },
        })
            .sort({ date: 1 })
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listAllTerminados = listAllTerminados;
function listPendientes({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 0,
            entregado: 0,
        })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listPendientes = listPendientes;
function listTerminados({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 1,
            entregado: 0,
        })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listTerminados = listTerminados;
function listEntregados({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.find({
            empresa: empresaId,
            terminado: 1,
            entregado: 1,
        })
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listEntregados = listEntregados;
function listByIds({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return utils_1.EmpresaPedido.find({ _id: { $in: ids } })
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
function listOne({ empresaPedidoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.findOne({ _id: empresaPedidoId })
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
function addEmpresaPedido(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.create(value);
    });
}
exports.addEmpresaPedido = addEmpresaPedido;
function updateEmpresaPedido({ empresaPedidoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.findOneAndUpdate({ _id: empresaPedidoId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateEmpresaPedido = updateEmpresaPedido;
function deleteEmpresaPedido(empresaPedidoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.EmpresaPedido.findOneAndDelete({ _id: empresaPedidoId });
    });
}
exports.deleteEmpresaPedido = deleteEmpresaPedido;
