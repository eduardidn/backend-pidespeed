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
class TasaFunc {
    constructor() {
        this.mes = 0;
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
            this.token = yield _utils_1.TokenUtils.createUserToken({ user: { _id: 1234 } });
            const data = {
                tasa_dt: tasaDT,
                tasa_bcv: tasaBCV,
            };
            // actualizar tasa config
            axios_1.default.put(`https://ssl.pidespeed.com/api/config/1`, data, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            this.cambiarTasaBCV(tasaBCV);
            this.cambiarTasaDT(tasaDT);
        }));
    }
    cambiarTasaDT(tasaDT) {
        // buscar empresas con tasa de dolar today
        axios_1.default
            .get("https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_dt")
            .then((empresas) => {
            // recorrer empresas
            empresas.data.map((empresa) => {
                if (empresa.tasa !== tasaDT) {
                    // buscar adicionales
                    axios_1.default
                        .get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`)
                        .then((adicionales) => {
                        // recorrer adicionales
                        adicionales.data.forEach((adicional, index) => {
                            let precioFinal1 = 0;
                            if (adicional.precio$ !== 0) {
                                let precioBs = Math.round(tasaDT * adicional.precio$);
                                if (empresa.porcent_mas !== 0) {
                                    precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            const precio = {
                                precio: precioFinal1,
                            };
                            if (precioFinal1 !== 0) {
                                // actualizar precio de adicional
                                axios_1.default.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } });
                            }
                        });
                        // foreacho de adicionales
                    });
                    // busqueda de productos
                    axios_1.default
                        .get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`)
                        .then((productos) => {
                        // recorrer productos
                        productos.data.forEach((producto, index) => {
                            let precioFinal1 = 0;
                            let precioFinalToGo = 1;
                            if (producto.precio1_dl !== 0) {
                                let precioBs = Math.round(tasaDT * producto.precio1_dl);
                                if (empresa.porcent_mas !== 0) {
                                    precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            if (producto.to_go > 1) {
                                const precioBs = Math.round(tasaDT * producto.to_go$);
                                precioFinalToGo = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinalToGo = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            else if (producto.to_go === 0) {
                                precioFinalToGo = 0;
                            }
                            const precio = {
                                precio1: precioFinal1,
                                to_go: precioFinalToGo,
                            };
                            // modificar precio de productos
                            axios_1.default
                                .put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } })
                                .then((producto) => {
                                if (index === productos.data.length - 1) {
                                    const data = {
                                        tasa: tasaDT,
                                    };
                                    axios_1.default.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, {
                                        headers: {
                                            Authorization: `Bearer ${this.token}`,
                                        },
                                    });
                                }
                            });
                        });
                        // forech de productos
                    });
                    // busqueda de productos
                }
            });
            // map de empresas
        });
        // busqueda de empresas
    }
    cambiarTasaBCV(tasaBCV) {
        // buscar empresas con tasa de dolar BCV
        axios_1.default
            .get("https://ssl.pidespeed.com/public/empresas/get/byTasa/tasa_bcv")
            .then((empresas) => {
            // recorrer empresas
            empresas.data.map((empresa) => {
                if (empresa.tasa !== tasaBCV) {
                    // buscar adicionales
                    axios_1.default
                        .get(`https://ssl.pidespeed.com/public/adicionales/${empresa.id}/2`)
                        .then((adicionales) => {
                        // recorrer adicionales
                        adicionales.data.forEach((adicional, index) => {
                            let precioFinal1 = 0;
                            if (adicional.precio$ !== 0) {
                                let precioBs = Math.round(tasaBCV * adicional.precio$);
                                if (empresa.porcent_mas !== 0) {
                                    precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            const precio = {
                                precio: precioFinal1,
                            };
                            if (precioFinal1 !== 0) {
                                // modificar precio de adicionales
                                axios_1.default.put(`https://ssl.pidespeed.com/api/adicionales/${adicional.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } });
                            }
                        });
                        // foreacho de adicionales
                    });
                    // busqueda de productos
                    axios_1.default
                        .get(`https://ssl.pidespeed.com/public/productos/${empresa.ruta}/2`)
                        .then((productos) => {
                        // recorrer productos
                        productos.data.forEach((producto, index) => {
                            let precioFinal1 = 0;
                            let precioFinalToGo = 1;
                            if (producto.precio1_dl !== 0) {
                                let precioBs = Math.round(tasaBCV * producto.precio1_dl);
                                if (empresa.porcent_mas !== 0) {
                                    precioBs = Math.round(precioBs + (precioBs * empresa.porcent_mas) / 100);
                                }
                                precioFinal1 = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinal1 = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinal1 = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            if (producto.to_go > 1) {
                                const precioBs = Math.round(tasaBCV * producto.to_go$);
                                precioFinalToGo = precioBs;
                                if (empresa.redondear_precio === 1) {
                                    const precioBsString = precioBs.toString();
                                    let ultNums = precioBsString.substr(-3);
                                    let primNums = "";
                                    if (ultNums === "500") {
                                        precioFinalToGo = precioBs;
                                    }
                                    else {
                                        const longitud = precioBsString.length - 3;
                                        primNums = precioBsString.slice(0, longitud);
                                        ultNums = Number(ultNums);
                                        if (ultNums > 500) {
                                            primNums = (Number(primNums) + 1).toString();
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                        else {
                                            precioFinalToGo = Number(primNums + "000");
                                        }
                                    }
                                }
                            }
                            else if (producto.to_go === 0) {
                                precioFinalToGo = 0;
                            }
                            const precio = {
                                precio1: precioFinal1,
                                to_go: precioFinalToGo,
                            };
                            // modificar precio de productos
                            axios_1.default
                                .put(`https://ssl.pidespeed.com/api/productos/${producto.id}`, precio, { headers: { Authorization: `Bearer ${this.token}` } })
                                .then((producto) => {
                                if (index === productos.data.length - 1) {
                                    const data = {
                                        tasa: tasaBCV,
                                    };
                                    axios_1.default.put(`https://ssl.pidespeed.com/api/empresas/${empresa.id}`, data, {
                                        headers: {
                                            Authorization: `Bearer ${this.token}`,
                                        },
                                    });
                                }
                            });
                        });
                        // forech de productos
                    });
                    // busqueda de productos
                }
            });
            // map de empresas
        });
        // busqueda de empresas
    }
}
const tasaFunc = new TasaFunc();
exports.default = tasaFunc;
