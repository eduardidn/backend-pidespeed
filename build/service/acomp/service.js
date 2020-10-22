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
exports.deleteAcomp = exports.updateAcomp = exports.addAcomp = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Acomp.find({}).lean();
    });
}
exports.list = list;
function listOne({ acompId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Acomp.findOne({ _id: acompId }).lean();
    });
}
exports.listOne = listOne;
function addAcomp(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Acomp.create(value);
    });
}
exports.addAcomp = addAcomp;
function updateAcomp({ acompId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Acomp.findOneAndUpdate({ _id: acompId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateAcomp = updateAcomp;
function deleteAcomp(acompId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Acomp.findOneAndDelete({ _id: acompId });
    });
}
exports.deleteAcomp = deleteAcomp;
