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
exports.deleteConfig = exports.updateConfig = exports.addConfig = exports.listOne = exports.list = void 0;
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Config.find({}).lean();
    });
}
exports.list = list;
function listOne({ configId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Config.findOne({ _id: configId }).lean();
    });
}
exports.listOne = listOne;
function addConfig(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Config.create(value);
    });
}
exports.addConfig = addConfig;
function updateConfig({ configId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Config.findOneAndUpdate({ _id: configId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateConfig = updateConfig;
function deleteConfig(configId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Config.findOneAndDelete({ _id: configId });
    });
}
exports.deleteConfig = deleteConfig;
