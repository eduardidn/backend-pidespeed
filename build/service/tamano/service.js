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
exports.deleteTamano = exports.updateTamano = exports.addTamano = exports.listOne = exports.listByEmpresa = exports.listAll = exports.list = void 0;
const _models_1 = require("@models");
function list({ ids, tipo }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        let query = {
            _id: { $in: ids },
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Tamano.find(query)
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
function listAll() {
    return _models_1.Tamano.find({})
        .lean()
        .then((datos) => datos.map((data) => {
        if (data) {
            data.id = data._id;
            return data;
        }
    }));
}
exports.listAll = listAll;
function listByEmpresa({ empresaId }) {
    return _models_1.Tamano.find({ empresa: empresaId })
        .lean()
        .then((datos) => datos.map((data) => {
        if (data) {
            data.id = data._id;
            return data;
        }
    }));
}
exports.listByEmpresa = listByEmpresa;
function listOne({ tamanoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Tamano.findOne({ _id: tamanoId })
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
function addTamano(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Tamano.create(value);
    });
}
exports.addTamano = addTamano;
function updateTamano({ tamanoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Tamano.findOneAndUpdate({ _id: tamanoId }, value, {
            new: true,
            lean: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateTamano = updateTamano;
function deleteTamano(tamanoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Tamano.findOneAndDelete({ _id: tamanoId });
    });
}
exports.deleteTamano = deleteTamano;
