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
exports.deleteCuenta = exports.updateCuenta = exports.addCuenta = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Cuenta.find({}).lean();
    });
}
exports.list = list;
function listOne({ cuentaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Cuenta.findOne({ _id: cuentaId }).lean();
    });
}
exports.listOne = listOne;
function addCuenta(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Cuenta.create(value);
    });
}
exports.addCuenta = addCuenta;
function updateCuenta({ cuentaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Cuenta.findOneAndUpdate({ _id: cuentaId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateCuenta = updateCuenta;
function deleteCuenta(cuentaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Cuenta.findOneAndDelete({ _id: cuentaId });
    });
}
exports.deleteCuenta = deleteCuenta;
