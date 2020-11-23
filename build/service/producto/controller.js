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
exports.deleteProducto = exports.updateProducto = exports.addProducto = exports.listOne = exports.restarCantidad = exports.listOneByDatos = exports.listByIds = exports.listCatEsp = exports.list = void 0;
const _utils_1 = require("@utils");
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, ruta } = _utils_1.Validator.validate(req.params, "tipo ruta");
        return service.list({ tipo, ruta }).then((data) => res.json(data));
    });
}
exports.list = list;
function listCatEsp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, ruta } = _utils_1.Validator.validate(req.params, "tipo ruta");
        return service.listCatEsp({ tipo, ruta }).then((data) => res.json(data));
    });
}
exports.listCatEsp = listCatEsp;
function listByIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, ids } = _utils_1.Validator.validate(req.params, "tipo ids");
        return service.listByIds({ tipo, ids }).then((data) => res.json(data));
    });
}
exports.listByIds = listByIds;
function listOneByDatos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, descripcion } = _utils_1.Validator.validate(req.params, "nombre descripcion");
        return service
            .listOneByDatos({ nombre, descripcion })
            .then((data) => res.json(data));
    });
}
exports.listOneByDatos = listOneByDatos;
function restarCantidad(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productoId, cantidad } = _utils_1.Validator.validate(req.params, "productoId cantidad");
        return service
            .restarCantidad({ productoId, cantidad })
            .then((data) => res.json(data));
    });
}
exports.restarCantidad = restarCantidad;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productoId } = req.params;
        return service.listOne({ productoId }).then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function addProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.addProducto(req.body).then((data) => res.json(data));
    });
}
exports.addProducto = addProducto;
function updateProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productoId } = req.params;
        const value = req.body;
        return service
            .updateProducto({ productoId, value })
            .then((data) => res.json(data));
    });
}
exports.updateProducto = updateProducto;
function deleteProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productoId } = req.params;
        return service.deleteProducto(productoId).then((data) => res.json(data));
    });
}
exports.deleteProducto = deleteProducto;
