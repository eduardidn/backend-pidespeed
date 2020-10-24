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
exports.deleteCategoriaProducto = exports.updateCategoriaProducto = exports.addCategoriaProducto = exports.listOne = exports.listByRuta = exports.list = void 0;
const _models_1 = require("@models");
function list(tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? 1 : 0;
        let query;
        if (tipo === 1)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.CategoriaProducto.find(query).populate("categoria", "icono").lean();
    });
}
exports.list = list;
function listByRuta({ tipo, ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: empresa } = yield _models_1.Empresa.findOne({ ruta }).lean();
        tipo = Number(tipo) === 1 ? 1 : 0;
        let query = {
            empresa,
        };
        if (tipo === 1)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.CategoriaProducto.find(query).lean();
    });
}
exports.listByRuta = listByRuta;
function listOne({ categoriaProductoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.CategoriaProducto.findOne({ _id: categoriaProductoId }).lean();
    });
}
exports.listOne = listOne;
function addCategoriaProducto(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.CategoriaProducto.create(value);
    });
}
exports.addCategoriaProducto = addCategoriaProducto;
function updateCategoriaProducto({ categoriaProductoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.CategoriaProducto.findOneAndUpdate({ _id: categoriaProductoId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateCategoriaProducto = updateCategoriaProducto;
function deleteCategoriaProducto(categoriaProductoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.CategoriaProducto.findOneAndDelete({ _id: categoriaProductoId });
    });
}
exports.deleteCategoriaProducto = deleteCategoriaProducto;
