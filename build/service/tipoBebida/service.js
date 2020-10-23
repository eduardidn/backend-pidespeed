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
exports.deleteTipoBebida = exports.updateTipoBebida = exports.addTipoBebida = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.TipoBebida.find({}).lean();
    });
}
exports.list = list;
function listOne({ tipoBebidaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.TipoBebida.findOne({ _id: tipoBebidaId }).lean();
    });
}
exports.listOne = listOne;
function addTipoBebida(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.TipoBebida.create(value);
    });
}
exports.addTipoBebida = addTipoBebida;
function updateTipoBebida({ tipoBebidaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.TipoBebida.findOneAndUpdate({ _id: tipoBebidaId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateTipoBebida = updateTipoBebida;
function deleteTipoBebida(tipoBebidaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.TipoBebida.findOneAndDelete({ _id: tipoBebidaId });
    });
}
exports.deleteTipoBebida = deleteTipoBebida;
