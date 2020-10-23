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
exports.deleteSirope = exports.updateByIds = exports.updateSirope = exports.addSirope = exports.listOne = exports.listByIds = exports.list = void 0;
const _models_1 = require("@models");
function list(tipo, empresaId) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? 1 : 0;
        let query = {
            empresa: empresaId,
        };
        if (tipo === 1)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Sirope.find(query).lean();
    });
}
exports.list = list;
function listByIds(tipo, ids) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? 1 : 0;
        ids = ids.split(",");
        let query = {
            _id: { $in: ids },
        };
        if (tipo === 1)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Sirope.find(query).lean();
    });
}
exports.listByIds = listByIds;
function listOne({ siropeId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Sirope.findOne({ _id: siropeId }).lean();
    });
}
exports.listOne = listOne;
function addSirope(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Sirope.create(value);
    });
}
exports.addSirope = addSirope;
function updateSirope({ siropeId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Sirope.findOneAndUpdate({ _id: siropeId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateSirope = updateSirope;
function updateByIds({ value, ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return _models_1.Sirope.updateMany({ _id: { $in: ids } }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateByIds = updateByIds;
function deleteSirope(siropeId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Sirope.findOneAndDelete({ _id: siropeId });
    });
}
exports.deleteSirope = deleteSirope;
