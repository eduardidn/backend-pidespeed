import { Server } from "socket.io";
import { checkNotifications, pedido, deleteNotification } from "./functions";

export function onConnect(socket, io?: Server): void {
  // verificar notificaciones no entregadas
  checkNotifications();

  // socket de pedidos
  socket.on("pedido:actualizado", (data) => pedido("actualizado", data));
  socket.on("pedido:nuevoEmpresa", (data) => pedido("nuevoEmpresa", data));
  socket.on("pedido:nuevo", (data) => pedido("nuevo", data));
  socket.on("actualizar:pedidos", (data) => pedido("actualizar:pedidos", data));
  socket.on("actualizar:pedidosEmpresa", (data) =>
    pedido("actualizar:pedidosEmpresa", data),
  );

  // BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS
  socket.on("notificacion:usuario", (data) => deleteNotification("user", data));
  socket.on("notificacion:empresa", (data) =>
    deleteNotification("empresa", data),
  );
}

export function onConnectAdmin(socket, io?: Server): void {
  // verificar notificaciones no entregadas
  checkNotifications();

  // socket de pedidos
  socket.on("pedido:actualizado", (data) => pedido("actualizado", data));
  socket.on("pedido:nuevoEmpresa", (data) => pedido("nuevoEmpresa", data));
  socket.on("actualizar:pedidos", (data) => pedido("actualizar:pedidos", data));
  // BORRAR NOTIFICACIONES CUANDO YA HAN SIDO VISTAS
  socket.on("notificacion:usuario", (data) => deleteNotification("user", data));
  socket.on("notificacion:empresa", (data) =>
    deleteNotification("empresa", data),
  );
}
