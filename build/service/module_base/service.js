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
const utils_1 = require("../../utils");
const BUCKETNAME = "pidespeed-storage";
const tablas = {
    acomp: utils_1.Acomp,
    adicional: utils_1.Adicional,
    bebida: utils_1.Bebida,
    topping: utils_1.Topping,
    sirope: utils_1.Sirope,
    sabor: utils_1.Sabor,
    tamano: utils_1.Tamano,
    zona: utils_1.Zona,
    categoriaProducto: utils_1.CategoriaProducto,
};
function importar() {
    return __awaiter(this, void 0, void 0, function* () {
        // await UploadImage.listFiles();
        /* let empresas = await Empresa.find({}).skip(17).limit(5).lean();
        for (let empresa of empresas) {
          if (filename != 'default-empresas.jpg') {
            await UploadImage.uploadTest(filename)
            let { _id: file } = await File.create({ url: empresa.img, type: 'empresa' })
            await Empresa.findOneAndUpdate({ _id: empresa._id }, { img: file }, { lean: true })
          }
        }
        return 'ok' */
        /* let files = await File.find().limit(15).sort({ _id: -1 }).lean()
        return files */
        /* const datos = await Empresa.find({}).skip(1).lean();
        for (let data of datos) {
          let logo = '5fa5b4bdb6dac50570af1a1b';
          let img = '5fa5b438e8a25c36c0fe1f52';
          if (data.logo === 'web/6.png') {
            await Empresa.findOneAndUpdate({ _id: data._id }, { logo, img }, {  new: true })
          }
        } */
        // return datos;
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
