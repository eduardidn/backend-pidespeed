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
exports.deleteFavoritoByUsuario = exports.deleteFavorito = exports.addFavorito = exports.verifyFavorito = exports.listOne = exports.listAll = exports.listEsp = exports.list = void 0;
const _models_1 = require("@models");
function list({ usuarioId }) {
    return __awaiter(this, void 0, void 0, function* () {
        let favoritos = yield _models_1.Favorito.find({ usuario: usuarioId })
            .populate("empresa", null, { publish: true }, { populate: "img logo" })
            .populate("categoria")
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
        favoritos = favoritos.filter((favorito) => favorito.empresa);
        return favoritos;
    });
}
exports.list = list;
function listEsp({ usuarioId, ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: categoria } = yield _models_1.Categoria.findOne({ ruta }).lean();
        let favoritos = yield _models_1.Favorito.findOne({ usuario: usuarioId, categoria })
            .populate("empresa", null, { publish: true }, { populate: "img logo" })
            .populate("categoria")
            .lean()
            .then((data) => {
            data.id = data._id;
            return data;
        });
        favoritos = favoritos.filter((favorito) => favorito.empresa);
        return favoritos;
    });
}
exports.listEsp = listEsp;
function listAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.find({})
            .populate("empresa", { populate: "img logo" })
            .populate("categoria")
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
function listOne({ usuarioId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.findOne({ usuario: usuarioId, empresa: empresaId })
            .populate("empresa", { populate: "img, logo" })
            .populate("categoria")
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
function verifyFavorito({ usuarioId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.countDocuments({
            usuario: usuarioId,
            empresa: empresaId,
        }).then((data) => data > 0);
    });
}
exports.verifyFavorito = verifyFavorito;
function addFavorito(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.create(value);
    });
}
exports.addFavorito = addFavorito;
function deleteFavorito(favoritoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.findOneAndDelete({ _id: favoritoId });
    });
}
exports.deleteFavorito = deleteFavorito;
function deleteFavoritoByUsuario({ usuarioId, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Favorito.findOneAndDelete({ usuario: usuarioId, empresa: empresaId });
    });
}
exports.deleteFavoritoByUsuario = deleteFavoritoByUsuario;
