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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const Empresa_1 = __importDefault(require("./models/Empresa"));
const Adicional_1 = __importDefault(require("./models/Adicional"));
const Producto_1 = __importDefault(require("./models/Producto"));
const Config_1 = __importDefault(require("./models/Config"));
class TasaFunc {
    constructor() {
        this.mes = 0;
    }
    start() {
        node_cron_1.default.schedule("*/30 * * * *", () => {
            this.revisarTasa();
        });
        setTimeout(() => {
            this.revisarTasa();
        }, 15000);
    }
    revisarTasa() {
        // verificar tasa dollar today
        axios_1.default
            .get("https://s3.amazonaws.com/dolartoday/data.json")
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const tasaBCV = response.data.USD.promedio_real.toFixed();
            const tasaDT = response.data.USD.promedio.toFixed();
            // token para las consultas restringidas
            this.token = yield _utils_1.TokenUtils.createUserToken({
                usuarioId: { _id: 1234 },
            });
            this.cambiarTasaBCV(tasaBCV);
            this.cambiarTasaDT(tasaDT);
            yield Config_1.default.findOneAndUpdate({}, { tasa_dt: tasaDT, tasa_bcv: tasaBCV }, { lean: true });
        }));
    }
    cambiarTasaDT(tasaDT) {
        return __awaiter(this, void 0, void 0, function* () {
            // buscar empresas con tasa de dolar today
            const empresas = yield Empresa_1.default.find({ tasa_dt: 1 }).lean();
            // recorrer empresas
            empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                if (empresa.tasa !== tasaDT) {
                    this.actualizarAdicionales(tasaDT, empresa);
                    this.actualizarProductos(tasaDT, empresa);
                    yield Empresa_1.default.findOneAndUpdate({ _id: empresa._id }, { tasa: tasaDT }, { lean: true });
                }
            }));
            // map de empresas
        });
    }
    cambiarTasaBCV(tasaBCV) {
        return __awaiter(this, void 0, void 0, function* () {
            // buscar empresas con tasa de dolar BCV
            const empresas = yield Empresa_1.default.find({ tasa_bcv: 1 }).lean();
            // recorrer empresas
            empresas.map((empresa) => __awaiter(this, void 0, void 0, function* () {
                if (empresa.tasa !== tasaBCV) {
                    this.actualizarAdicionales(tasaBCV, empresa);
                    this.actualizarProductos(tasaBCV, empresa);
                    yield Empresa_1.default.findOneAndUpdate({ _id: empresa._id }, { tasa: tasaBCV }, { lean: true });
                }
            }));
            // map de empresas
            // busqueda de empresas
        });
    }
    // ACTUALIZAR ADICIONALES
    actualizarAdicionales(tasa, empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            // buscar adicionales
            const adicionales = yield Adicional_1.default.find({ empresa: empresa._id }).lean();
            // recorrer adicionales
            adicionales.forEach((adicional, index) => __awaiter(this, void 0, void 0, function* () {
                let precioFinal1 = 0;
                if (adicional.precio$ !== 0) {
                    let precioBs = Math.round(tasa * adicional.precio$);
                    if (empresa.porcent_mas !== 0) {
                        precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                    }
                    precioFinal1 = precioBs;
                    if (empresa.redondear_precio === 1)
                        precioFinal1 = this.redondearPrecio(precioBs);
                }
                if (precioFinal1 !== 0) {
                    // actualizar precio de adicional
                    yield Adicional_1.default.findOneAndUpdate({ _id: adicional._id }, { precio: precioFinal1 }, { lean: true });
                }
            }));
            // foreach de adicionales
        });
    }
    actualizarProductos(tasa, empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            // busqueda de productos
            const productos = yield Producto_1.default.find({ empresa: empresa._id }).lean();
            // recorrer productos
            productos.forEach((producto, index) => __awaiter(this, void 0, void 0, function* () {
                let precioFinal1 = 0;
                let precioFinalToGo = 1;
                if (producto.precio1_dl !== 0) {
                    let precioBs = Math.round(tasa * producto.precio1_dl);
                    if (empresa.porcent_mas !== 0) {
                        precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                    }
                    precioFinal1 = precioBs;
                    if (empresa.redondear_precio === 1)
                        precioFinal1 = this.redondearPrecio(precioBs);
                }
                if (producto.to_go > 1) {
                    const precioBs = Math.round(tasa * producto.to_go$);
                    precioFinalToGo = precioBs;
                    if (empresa.redondear_precio === 1)
                        precioFinalToGo = this.redondearPrecio(precioBs);
                }
                else if (producto.to_go === 0) {
                    precioFinalToGo = 0;
                }
                // modificar precio de productos
                yield Producto_1.default.findOneAndUpdate({ _id: producto._id }, { precio1: precioFinal1, to_go: precioFinalToGo }, { lean: true });
            }));
            // forech de productos
        });
    }
    redondearPrecio(precioBs) {
        const precioBsString = precioBs.toString();
        let ultNums = precioBsString.substr(-3);
        let primNums = "";
        if (ultNums === "500") {
            return precioBs;
        }
        else {
            const longitud = precioBsString.length - 3;
            primNums = precioBsString.slice(0, longitud);
            ultNums = Number(ultNums);
            if (ultNums > 500) {
                primNums = (Number(primNums) + 1).toString();
                return Number(primNums + "000");
            }
            else {
                return Number(primNums + "000");
            }
        }
    }
}
const tasaFunc = new TasaFunc();
exports.default = tasaFunc;
