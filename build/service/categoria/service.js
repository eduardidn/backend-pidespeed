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
exports.deleteCategoria = exports.updateCategoria = exports.addCategoria = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list(tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? 1 : 0;
        let query;
        if (tipo === 1)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Categoria.find(query)
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
function listOne({ categoriaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Categoria.findOne({ _id: categoriaId })
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
function addCategoria(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Categoria.create(value);
    });
}
exports.addCategoria = addCategoria;
function updateCategoria({ categoriaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Categoria.findOneAndUpdate({ _id: categoriaId }, value, {
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
exports.updateCategoria = updateCategoria;
function deleteCategoria(categoriaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Categoria.findOneAndDelete({ _id: categoriaId });
    });
}
exports.deleteCategoria = deleteCategoria;
