"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const service = __importStar(require("./service"));
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ruta, ciudadId, coordenadas } = req.params;
        return service
            .list({ ruta, ciudadId, coordenadas })
            .then((data) => res.json(data));
    });
}
exports.list = list;
function listAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { coordenadas } = req.params;
        return service.listAll(coordenadas).then((data) => res.json(data));
    });
}
exports.listAll = listAll;
function listAllInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId, ciudadId, coordenadas } = req.params;
        return service
            .listAllInfo({ empresaId, ciudadId, coordenadas })
            .then((data) => res.json(data));
    });
}
exports.listAllInfo = listAllInfo;
function listHome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tipo, sort, ciudadId, coordenadas } = req.params;
        return service
            .listHome({ tipo, ciudadId, sort, coordenadas })
            .then((data) => res.json(data));
    });
}
exports.listHome = listHome;
function listSucursales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId, coordenadas } = req.params;
        return service
            .listSucursales({ empresaId, coordenadas })
            .then((data) => res.json(data));
    });
}
exports.listSucursales = listSucursales;
function listOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { field, value } = req.params;
        return service.listOne({ field, value }).then((data) => res.json(data));
    });
}
exports.listOne = listOne;
function addVisita(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ruta } = req.params;
        return service.addVisita({ ruta }).then((data) => res.json(data));
    });
}
exports.addVisita = addVisita;
function addVenta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ruta } = req.params;
        return service.addVenta({ ruta }).then((data) => res.json(data));
    });
}
exports.addVenta = addVenta;
function addEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.addEmpresa(req.body).then((data) => res.json(data));
    });
}
exports.addEmpresa = addEmpresa;
function updateEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        const value = req.body;
        return service
            .updateEmpresa({ empresaId, value })
            .then((data) => res.json(data));
    });
}
exports.updateEmpresa = updateEmpresa;
function deleteEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empresaId } = req.params;
        return service.deleteEmpresa(empresaId).then((data) => res.json(data));
    });
}
exports.deleteEmpresa = deleteEmpresa;
