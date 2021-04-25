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
exports.saveCoords = exports.pedido = exports.deleteNotification = exports.checkNotifications = void 0;
const UsuarioEmpresa_1 = __importDefault(require("../models/UsuarioEmpresa"));
const index_1 = require("./index");
const notificationsUser = [];
const notificationsEmpresa = [];
const notificationsAdmin = [];
function checkNotifications() {
    notificationsUser.map((item) => {
        if (item.event) {
            index_1.emitSocket("user", item.id, item.event, item.data);
        }
    });
    notificationsEmpresa.map((item) => {
        if (item.event) {
            index_1.emitSocket("empresa", item.id, item.event, item.data);
        }
    });
    notificationsAdmin.map((item) => {
        if (item.event) {
            index_1.emitSocket("admin", item.id, item.event, item.data);
            if (item.admin)
                index_1.emitToAdmin(item.event, item.data);
        }
    });
}
exports.checkNotifications = checkNotifications;
function deleteNotification(type, data) {
    if (type === "user")
        notificationsUser[data.userId] = {
            event: "",
        };
    else
        this.notificationsEmpresas[data.id] = {
            event: "",
        };
}
exports.deleteNotification = deleteNotification;
function pedido(type, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const emitPedidioNotification = {
            actualizado: PActualizado,
            nuevoEmpresa: PNuevoEmpresa,
            nuevo: (data) => index_1.emitToAdmin("pedido:nuevo", data),
            "actualizar:pedidos": (data) => index_1.emitToAdmin("actualizar:pedidos", data),
            "actualizar:pedidosEmpresa": (data) => index_1.emitSocket("empresa", data.id, "actualizar:pedidosEmpresa", data),
        };
        emitPedidioNotification[type](data);
    });
}
exports.pedido = pedido;
function saveCoords({ id: workerId, coords }) {
    return __awaiter(this, void 0, void 0, function* () {
        UsuarioEmpresa_1.default.findOneAndUpdate({ _id: workerId }, { coordinates: coords }).exec();
    });
}
exports.saveCoords = saveCoords;
function PActualizado(data) {
    index_1.emitSocket("user", data.userId, "pedido:actualizado", data);
    notificationsUser[data.userId] = {
        event: "pedido:actualizado",
        data,
    };
}
function PNuevoEmpresa(data) {
    index_1.emitSocket("empresa", data.empresaId, "pedido:nuevoEmpresa", data);
    notificationsEmpresa[data.empresaId] = {
        event: "pedido:actualizado",
        data,
    };
}
