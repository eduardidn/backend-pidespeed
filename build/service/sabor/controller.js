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
exports.deleteSabor = exports.updateByIds = exports.updateSabor = exports.addSabor = exports.listOne = exports.listByIds = exports.list = void 0;
const utils_1 = require("../../utils");
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, empresaId } = utils_1.Validator.validate(req.params, "tipo empresaId");
        return service.list(tipo, empresaId).then((data) => res.json(data));
    });
}
exports.list = list;
function listByIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, ids } = utils_1.Validator.validate(req.params, "tipo ids");
        return service.listByIds(tipo, ids).then((data) => res.json(data));
    });
}
exports.listByIds = listByIds;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { saborId } = req.params;
        return service.listOne({ saborId }).then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function addSabor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* const { nombre, precio, cantidad, publish, empresa } = Validator.validate(
          req.body,
          "nombre precio cantidad publish empresa",
        ); */
        return service.addSabor(req.body).then((data) => res.json(data));
    });
}
exports.addSabor = addSabor;
function updateSabor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { saborId } = req.params;
        const value = req.body;
        return service.updateSabor({ saborId, value }).then((data) => res.json(data));
    });
}
exports.updateSabor = updateSabor;
function updateByIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ids } = req.params;
        const value = req.body;
        return service.updateByIds({ ids, value }).then((data) => res.json(data));
    });
}
exports.updateByIds = updateByIds;
function deleteSabor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { saborId } = req.params;
        return service.deleteSabor(saborId).then((data) => res.json(data));
    });
}
exports.deleteSabor = deleteSabor;
