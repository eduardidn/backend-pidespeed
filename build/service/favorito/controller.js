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
exports.deleteFavoritoByUsuario = exports.deleteFavorito = exports.addFavorito = exports.listAll = exports.verifyFavorito = exports.listOne = exports.listEsp = exports.list = void 0;
const utils_1 = require("../../utils");
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId } = req.params;
        return service.list({ usuarioId }).then((data) => res.json(data));
    });
}
exports.list = list;
function listEsp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId, ruta } = req.params;
        return service.listEsp({ usuarioId, ruta }).then((data) => res.json(data));
    });
}
exports.listEsp = listEsp;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId, empresaId } = req.params;
        return service
            .listOne({ usuarioId, empresaId })
            .then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function verifyFavorito(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId, empresaId } = req.params;
        return service
            .verifyFavorito({ usuarioId, empresaId })
            .then((data) => res.json(data));
    });
}
exports.verifyFavorito = verifyFavorito;
function listAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.listAll().then((data) => res.json(data));
    });
}
exports.listAll = listAll;
function addFavorito(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuario, empresa, categoria } = utils_1.Validator.validate(req.body, "usuario empresa categoria");
        return service
            .addFavorito({ usuario, empresa, categoria })
            .then((data) => res.json(data));
    });
}
exports.addFavorito = addFavorito;
function deleteFavorito(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { favoritoId } = req.params;
        return service.deleteFavorito(favoritoId).then((data) => res.json(data));
    });
}
exports.deleteFavorito = deleteFavorito;
function deleteFavoritoByUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usuarioId, empresaId } = req.params;
        return service
            .deleteFavoritoByUsuario({ usuarioId, empresaId })
            .then((data) => res.json(data));
    });
}
exports.deleteFavoritoByUsuario = deleteFavoritoByUsuario;
