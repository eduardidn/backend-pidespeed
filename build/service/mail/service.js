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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailPromocion = exports.mailVerificacion = exports.mailRecuperarPass = exports.mailBienvenido = exports.mailNuevoPedido = exports.mailPedidoListo = exports.mailEstadoPedido = exports.mailCambio = void 0;
const templates = __importStar(require("./templates"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailCambio(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, text, subject, codigo } = val;
        /* let transporter = nodemailer.createTransport({
              host: 'smtp-relay.sendinblue.com',
              port: '587',
              auth: {
                  user: 'pidespeed@gmail.com',
                  pass: 'n90ChP4D5zkgbaNH'
              },
              logger: true,
              debug: false
          }); */
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: "465",
            auth: {
                user: "Pidespeed@gmail.com",
                pass: "qphtkmofxbcvxkbl",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject,
            // text: 'Hello to myself!',
            html: templates.mailCambio({ text, nombre, codigo }),
        };
        try {
            yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailCambio = mailCambio;
function mailEstadoPedido(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, contenido, codigo } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: "587",
            auth: {
                user: "pidespeed@gmail.com",
                pass: "n90ChP4D5zkgbaNH",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "Actualización de su pedido",
            // text: 'Hello to myself!',
            html: templates.mailEstadoPedido({ contenido, codigo }),
        };
        try {
            yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailEstadoPedido = mailEstadoPedido;
function mailPedidoListo(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, codigo, nombreEmpresa, coordenadas } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: "587",
            auth: {
                user: "pidespeed@gmail.com",
                pass: "n90ChP4D5zkgbaNH",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "Pedido Terminado",
            // text: 'Hello to myself!',
            html: templates.mailPedidoListo({ codigo, nombreEmpresa, coordenadas }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailPedidoListo = mailPedidoListo;
function mailNuevoPedido(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, codigo } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: "465",
            auth: {
                user: "Pidespeed@gmail.com",
                pass: "qphtkmofxbcvxkbl",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "Nuevo Pedido",
            // text: 'Hello to myself!',
            html: templates.mailNuevoPedido({ nombre, codigo }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailNuevoPedido = mailNuevoPedido;
/**
 * CORREOS PUBLICOS
 */
function mailBienvenido(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: "587",
            auth: {
                user: "pidespeed@gmail.com",
                pass: "n90ChP4D5zkgbaNH",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "Bienvenido a Pidespeed",
            // text: 'Hello to myself!',
            html: templates.mailBienvenido({ nombre }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailBienvenido = mailBienvenido;
function mailRecuperarPass(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, codigo } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: "465",
            auth: {
                user: "Pidespeed@gmail.com",
                pass: "qphtkmofxbcvxkbl",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "Recuperación de Contraseña",
            html: templates.mailRecuperarPass({ nombre, codigo }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailRecuperarPass = mailRecuperarPass;
function mailVerificacion(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email, link } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: "465",
            auth: {
                user: "Pidespeed@gmail.com",
                pass: "qphtkmofxbcvxkbl",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "verifique su cuenta de PideSpeed",
            // text: 'Hello to myself!',
            html: templates.mailVerificacion({ nombre, link }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailVerificacion = mailVerificacion;
function mailPromocion(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, email } = val;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: "587",
            auth: {
                user: "pidespeed@gmail.com",
                pass: "n90ChP4D5zkgbaNH",
            },
            logger: true,
            debug: false,
        });
        const message = {
            from: "PideSpeed <Pidespeed@gmail.com>",
            to: nombre + "<" + email + ">",
            subject: "20% de DESCUENTO Para Ti",
            // text: 'Hello to myself!',
            html: templates.mailPromocion({ nombre }),
        };
        try {
            const info = yield transporter.sendMail(message);
            return { message: "ok" };
        }
        catch (err) {
            return err;
        }
    });
}
exports.mailPromocion = mailPromocion;
