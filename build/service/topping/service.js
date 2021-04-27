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
exports.deleteTopping = exports.updateByIds = exports.updateTopping = exports.addTopping = exports.listOne = exports.listByIds = exports.list = void 0;
const utils_1 = require("../../utils");
function list(tipo, empresaId) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        let query = {
            empresa: empresaId,
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return utils_1.Topping.find(query)
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
function listByIds(tipo, ids) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        ids = ids.split(",");
        let query = {
            _id: { $in: ids },
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return utils_1.Topping.find(query)
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByIds = listByIds;
function listOne({ toppingId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Topping.findOne({ _id: toppingId })
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
function addTopping(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Topping.create(value);
    });
}
exports.addTopping = addTopping;
function updateTopping({ toppingId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Topping.findOneAndUpdate({ _id: toppingId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateTopping = updateTopping;
function updateByIds({ value, ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return utils_1.Topping.updateMany({ _id: { $in: ids } }, value, {
            new: true,
        });
    });
}
exports.updateByIds = updateByIds;
function deleteTopping(toppingId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Topping.findOneAndDelete({ _id: toppingId });
    });
}
exports.deleteTopping = deleteTopping;
