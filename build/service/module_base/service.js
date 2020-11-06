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
exports.importar = void 0;
const _models_1 = require("@models");
const tablas = {
    acomp: _models_1.Acomp,
    adicional: _models_1.Adicional,
    bebida: _models_1.Bebida,
    topping: _models_1.Topping,
    sirope: _models_1.Sirope,
    sabor: _models_1.Sabor,
    tamano: _models_1.Tamano,
    zona: _models_1.Zona,
    categoriaProducto: _models_1.CategoriaProducto,
};
function importar() {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield _models_1.Empresa.find({}).skip(1).lean();
        /* for (let data of datos) {
          let { contacto } = data;
          if (contacto == "") contacto = {}
          else contacto = JSON.parse(contacto)
          await Empresa.findOneAndUpdate({ _id: data._id }, { contacto }, { lean: true, new: true })
        } */
        return datos;
    });
}
exports.importar = importar;
function isJsonString(str) {
    try {
        str = JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function obtenerIdsAcomp({ valor, consulta }) {
    return __awaiter(this, void 0, void 0, function* () {
        valor = valor.split(",");
        const response = yield tablas[consulta]
            .find({ prev_id: { $in: valor } })
            .select("_id")
            .lean();
        let value = "";
        response.map((valor, index) => {
            if (index === response.length - 1) {
                value += valor._id;
            }
            else {
                value += valor._id + ",";
            }
        });
        return value;
    });
}
function obtenerIds({ valor, consulta }) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const val of valor) {
            const { _id: id } = yield tablas[consulta]
                .findOne({ prev_id: val.id })
                .select("_id")
                .lean();
            val.id = id;
        }
        return valor;
    });
}
