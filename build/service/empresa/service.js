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
exports.getDistance = exports.deleteEmpresa = exports.updateEmpresa = exports.addEmpresa = exports.addVenta = exports.addVisita = exports.listOne = exports.listSucursales = exports.listHome = exports.listAllInfo = exports.listAll = exports.list = void 0;
const utils_1 = require("../../utils");
const service_1 = require("../usuarioEmpresa/service");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
function list({ ruta, ciudadId, coordenadas }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: categoria } = yield utils_1.Categoria.findOne({ ruta }).lean();
        let query = { publish: false, es_sucursal: 0, categoria, prueba: 1 };
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        const empresas = yield utils_1.Empresa.find(query)
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
        return coordenadas
            ? Promise.all(empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                empresa.distance = yield getDistance(empresa.coordenadas, "");
                return empresa;
            })))
            : empresas;
    });
}
exports.list = list;
function listAll(coordenadas) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresas = yield utils_1.Empresa.find({})
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
        return coordenadas
            ? Promise.all(empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                empresa.distance = yield getDistance(empresa.coordenadas, "");
                return empresa;
            })))
            : empresas;
    });
}
exports.listAll = listAll;
function listAllInfo({ empresaId, ciudadId, coordenadas }) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = { _id: empresaId };
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        const empresas = yield utils_1.Empresa.find(query)
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
        return coordenadas
            ? Promise.all(empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                empresa.distance = yield getDistance(empresa.coordenadas, "");
                return empresa;
            })))
            : empresas;
    });
}
exports.listAllInfo = listAllInfo;
function listHome({ tipo, ciudadId, sort, coordenadas }) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        let query = { es_sucursal: 0 };
        if (tipo === 3)
            query = Object.assign(Object.assign({}, query), { prueba: 1 });
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        if (ciudadId)
            query = Object.assign(Object.assign({}, query), { ciudad: ciudadId });
        const empresas = yield utils_1.Empresa.find(query)
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
        return coordenadas
            ? Promise.all(empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                empresa.distance = yield getDistance(empresa.coordenadas, "");
                return empresa;
            })))
            : empresas;
    });
}
exports.listHome = listHome;
function listSucursales({ empresaId, coordenadas }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresas = yield utils_1.Empresa.findOne({ empresa: empresaId })
            .select("_id nombre principal")
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
        return coordenadas
            ? Promise.all(empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                empresa.distance = yield getDistance(empresa.coordenadas, "");
                return empresa;
            })))
            : empresas;
    });
}
exports.listSucursales = listSucursales;
function listOne({ field, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield utils_1.Empresa.findOne({ [field]: value })
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
        empresa.distance = yield getDistance(empresa.coordenadas, "");
        return empresa;
    });
}
exports.listOne = listOne;
function addVisita({ ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield utils_1.Empresa.findOne({ ruta }).select("visitas").exec();
        empresa.visitas = empresa.visitas + 1;
        empresa.save();
    });
}
exports.addVisita = addVisita;
function addVenta({ ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield utils_1.Empresa.findOne({ ruta }).select("ventas").exec();
        empresa.ventas = empresa.ventas + 1;
        empresa.save();
    });
}
exports.addVenta = addVenta;
function addEmpresa(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = yield utils_1.Empresa.create(value);
        const { username, telefono, password, email } = value;
        const user = {
            empresa: empresa._id,
            username,
            password,
            telefono,
            email,
            type: "empresa",
        };
        const usuario = yield service_1.addUsuario(user);
        return { empresa, usuario };
    });
}
exports.addEmpresa = addEmpresa;
function updateEmpresa({ empresaId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Empresa.findOneAndUpdate({ _id: empresaId }, value, {
            new: true,
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
        const empresa = yield utils_1.Empresa.findOneAndDelete({ _id: empresaId });
        if (empresa.logo !== "5fa5b4bdb6dac50570af1a1b")
            yield utils_1.UploadImage.deleteImage(empresa.img);
        if (empresa.logo !== "5fa5b438e8a25c36c0fe1f52")
            yield utils_1.UploadImage.deleteImage(empresa.img);
        empresa.delete();
        return empresa;
    });
}
exports.deleteEmpresa = deleteEmpresa;
function getDistance(eCoordenadas, uLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const eCoor = eCoordenadas ? _parseCoordinates(eCoordenadas) : null;
        const uCoor = _parseCoordinates(uLocation);
        return (eCoor === null || eCoor === void 0 ? void 0 : eCoor.lat) & (uCoor === null || uCoor === void 0 ? void 0 : uCoor.lat) ? _getMettersDistance(eCoor, uCoor) : false;
    });
}
exports.getDistance = getDistance;
function _parseCoordinates(coor) {
    var _a, _b, _c;
    const coordenadas = coor === null || coor === void 0 ? void 0 : coor.split(",");
    const lat = Number((_a = coordenadas === null || coordenadas === void 0 ? void 0 : coordenadas[0]) === null || _a === void 0 ? void 0 : _a.substr(1));
    const lng = Number((_c = (_b = coordenadas === null || coordenadas === void 0 ? void 0 : coordenadas[1]) === null || _b === void 0 ? void 0 : _b.substr(1)) === null || _c === void 0 ? void 0 : _c.slice(0, -1));
    return lat & lng && { lat, lng };
}
function _getMettersDistance(origin, uLocation) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        const client = new google_maps_services_js_1.Client({});
        const distance = (_f = (_e = (_d = (_c = (_b = (_a = (yield client.distancematrix({
            params: {
                origins: [origin],
                destinations: [uLocation],
                key: process.env.GOOGLE_KEY,
            },
        })).data) === null || _a === void 0 ? void 0 : _a.rows) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.elements) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.distance) === null || _f === void 0 ? void 0 : _f.text;
        let metters = Number(distance === null || distance === void 0 ? void 0 : distance.split(" ")[0]);
        if (!((_g = distance) === null || _g === void 0 ? void 0 : _g.includes("km")) && metters)
            metters = metters / 1000;
        return metters;
    });
}
