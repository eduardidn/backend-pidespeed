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
exports.deleteBebida = exports.updateBebida = exports.addBebida = exports.listOne = exports.listByIds = exports.list = void 0;
const utils_1 = require("../../utils");
function list({ tipo, empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        let query = {
            empresa: empresaId,
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return utils_1.Bebida.find(query)
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
function listByIds({ tipo, ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        ids = ids.split(",");
        let query = {
            _id: { $in: ids },
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return utils_1.Bebida.find(query)
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
function listOne({ bebidaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Bebida.findOne({ _id: bebidaId })
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
function addBebida(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Bebida.create(value);
    });
}
exports.addBebida = addBebida;
function updateBebida({ bebidaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Bebida.findOneAndUpdate({ _id: bebidaId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateBebida = updateBebida;
function deleteBebida(bebidaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Bebida.findOneAndDelete({ _id: bebidaId });
    });
}
exports.deleteBebida = deleteBebida;
