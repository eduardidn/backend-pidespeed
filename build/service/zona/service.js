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
exports.deleteZona = exports.updateZona = exports.addZona = exports.listOne = exports.listByIds = exports.listAll = exports.list = void 0;
const utils_1 = require("../../utils");
function list({ ciudadId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.find({ ciudad: ciudadId })
            .sort({ nombre: 1 })
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
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.find({})
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listAll = listAll;
function listByIds({ ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        ids = ids.split(",");
        return utils_1.Zona.find({ _id: { $in: ids } })
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
function listOne({ zonaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.findOne({ _id: zonaId })
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
function addZona(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.create(value);
    });
}
exports.addZona = addZona;
function updateZona({ zonaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.findOneAndUpdate({ _id: zonaId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateZona = updateZona;
function deleteZona(zonaId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Zona.findOneAndDelete({ _id: zonaId });
    });
}
exports.deleteZona = deleteZona;
