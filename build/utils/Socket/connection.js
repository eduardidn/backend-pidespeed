"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnectAdmin = exports.onConnect = void 0;
const functions_1 = require("./functions");
function onConnect(socket, io) {
    // verificar notificaciones no entregadas
    functions_1.checkNotifications();
    // socket de pedidos
    socket.on("pedido:actualizado", (data) => functions_1.pedido("actualizado", data));
    socket.on("pedido:nuevoEmpresa", (data) => functions_1.pedido("nuevoEmpresa", data));
    socket.on("pedido:nuevo", (data) => functions_1.pedido("nuevo", data));
    socket.on("actualizar:pedidos", (data) => functions_1.pedido("actualizar:pedidos", data));
    socket.on("actualizar:pedidosEmpresa", (data) => functions_1.pedido("actualizar:pedidosEmpresa", data));
    // socket de coords
    socket.on("save-coords", (data) => functions_1.saveCoords(data));
    // BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS
    socket.on("notificacion:usuario", (data) => functions_1.deleteNotification("user", data));
    socket.on("notificacion:empresa", (data) => functions_1.deleteNotification("empresa", data));
}
exports.onConnect = onConnect;
function onConnectAdmin(socket, io) {
    // verificar notificaciones no entregadas
    functions_1.checkNotifications();
    // socket de pedidos
    socket.on("pedido:actualizado", (data) => functions_1.pedido("actualizado", data));
    socket.on("pedido:nuevoEmpresa", (data) => functions_1.pedido("nuevoEmpresa", data));
    socket.on("actualizar:pedidos", (data) => functions_1.pedido("actualizar:pedidos", data));
    // BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS
    socket.on("notificacion:usuario", (data) => functions_1.deleteNotification("user", data));
    socket.on("notificacion:empresa", (data) => functions_1.deleteNotification("empresa", data));
}
exports.onConnectAdmin = onConnectAdmin;
