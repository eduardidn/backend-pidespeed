"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.list().then((data) => res.json(data));
    });
}
exports.list = list;
function listEmpresaPedidos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pedidoId, empresaId } = req.params;
        return service
            .listEmpresaPedidos({ pedidoId, empresaId })
            .then((data) => res.json(data));
    });
}
exports.listEmpresaPedidos = listEmpresaPedidos;
function listByPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pedidoId } = req.params;
        return service.listByPedido({ pedidoId }).then((data) => res.json(data));
    });
}
exports.listByPedido = listByPedido;
function listByEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        return service.listByEmpresa({ empresaId }).then((data) => res.json(data));
    });
}
exports.listByEmpresa = listByEmpresa;
function listAllPendientes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.listAllPendientes().then((data) => res.json(data));
    });
}
exports.listAllPendientes = listAllPendientes;
function listAllTerminados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.listAllTerminados().then((data) => res.json(data));
    });
}
exports.listAllTerminados = listAllTerminados;
function listPendientes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        return service.listPendientes({ empresaId }).then((data) => res.json(data));
    });
}
exports.listPendientes = listPendientes;
function listTerminados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        return service.listTerminados({ empresaId }).then((data) => res.json(data));
    });
}
exports.listTerminados = listTerminados;
function listEntregados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        return service.listEntregados({ empresaId }).then((data) => res.json(data));
    });
}
exports.listEntregados = listEntregados;
function listByIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ids } = req.params;
        return service.listByIds({ ids }).then((data) => res.json(data));
    });
}
exports.listByIds = listByIds;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaPedidoId } = req.params;
        return service.listOne({ empresaPedidoId }).then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function addEmpresaPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.addEmpresaPedido(req.body).then((data) => res.json(data));
    });
}
exports.addEmpresaPedido = addEmpresaPedido;
function updateEmpresaPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaPedidoId } = req.params;
        const value = req.body;
        return service
            .updateEmpresaPedido({ empresaPedidoId, value })
            .then((data) => res.json(data));
    });
}
exports.updateEmpresaPedido = updateEmpresaPedido;
function deleteEmpresaPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaPedidoId } = req.params;
        return service
            .deleteEmpresaPedido(empresaPedidoId)
            .then((data) => res.json(data));
    });
}
exports.deleteEmpresaPedido = deleteEmpresaPedido;
