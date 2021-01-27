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
exports.deleteEmpresa = exports.updateEmpresa = exports.addEmpresa = exports.addVenta = exports.addVisita = exports.listOne = exports.listSucursales = exports.listHome = exports.listAllInfo = exports.listAll = exports.list = void 0;
const _models_1 = require("@models");
const service_1 = require("../usuarioEmpresa/service");
const _utils_1 = require("@utils");
function list({ ruta, ciudadId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: categoria } = yield _models_1.Categoria.findOne({ ruta }).lean();
        let query = { publish: true, es_sucursal: 0, categoria };
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        return _models_1.EmpresaDelivery.find(query)
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.list = list;
function listAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaDelivery.find({})
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
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
function listAllInfo({ empresaId, ciudadId }) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = { _id: empresaId };
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        return _models_1.EmpresaDelivery.find(query)
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listAllInfo = listAllInfo;
function listHome({ tipo, ciudadId, sort }) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        let query = { es_sucursal: 0 };
        if (tipo === 3)
            query = Object.assign(Object.assign({}, query), { prueba: 1 });
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        return _models_1.EmpresaDelivery.find(query)
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
            .sort({ [sort]: -1 })
            .lean()
            .then((datos) => datos.map((data) => {
            data.id = data._id;
            return data;
        }));
    });
}
exports.listHome = listHome;
function listSucursales({ empresaId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaDelivery.findOne({ empresa: empresaId })
            .select("_id nombre principal")
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listSucursales = listSucursales;
function listOne({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaDelivery.findOne({ [field]: value })
            .lean()
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listOne = listOne;
function addVisita({ ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield _models_1.EmpresaDelivery.findOne({ ruta })
            .select("visitas")
            .exec();
        empresa.visitas = empresa.visitas + 1;
        empresa.save();
    });
}
exports.addVisita = addVisita;
function addVenta({ ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield _models_1.EmpresaDelivery.findOne({ ruta })
            .select("ventas")
            .exec();
        empresa.ventas = empresa.ventas + 1;
        empresa.save();
    });
}
exports.addVenta = addVenta;
function addEmpresa(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield _models_1.EmpresaDelivery.create(value);
        const { username, telefono, password, email, nombreUsuario, apellidoUsuario, } = value;
        const user = {
            empresaDelivery: empresa._id,
            username,
            password,
            telefono,
            email,
            type: "delivery",
            nombre: nombreUsuario,
            apellido: apellidoUsuario,
        };
        const usuario = yield service_1.addUsuario(user);
        return { empresa, usuario };
    });
}
exports.addEmpresa = addEmpresa;
function updateEmpresa({ empresaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.EmpresaDelivery.findOneAndUpdate({ _id: empresaId }, value, {
            new: true,
            lean: true,
        })
            .populate("categoria", "ruta")
            .populate("logo", "url")
            .populate("img", "url")
            .populate("ciudad", "nombre")
            .populate("estado", "nombre")
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateEmpresa = updateEmpresa;
function deleteEmpresa(empresaId) {
    return __awaiter(this, void 0, void 0, function* () {
        const DeliveryCompany = yield _models_1.EmpresaDelivery.findOneAndDelete({
            _id: empresaId,
        });
        if (DeliveryCompany.logo !== "5fa5b4bdb6dac50570af1a1b")
            yield _utils_1.UploadImage.deleteImage(DeliveryCompany.img);
        if (DeliveryCompany.img !== "5fa5b438e8a25c36c0fe1f52")
            yield _utils_1.UploadImage.deleteImage(DeliveryCompany.img);
        DeliveryCompany.delete();
        return DeliveryCompany;
    });
}
exports.deleteEmpresa = deleteEmpresa;
