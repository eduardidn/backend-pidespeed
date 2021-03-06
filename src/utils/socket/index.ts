import socketIo from "socket.io";
import { onConnect, onConnectAdmin } from "./connection";
import * as middleware from "./middleware";
let io;
let admin;

export default function (httpServer) {
  io = socketIo(httpServer, {
    pingInterval: 20000,
    pingTimeout: 10000,
  });
  io.use(middleware.middleware);
  admin = io.of("/admin");
  admin.use(middleware.adminMiddleware);
  admin.on("connect", (socket) => onConnectAdmin(socket, admin));
  io.on("connect", (socket) => onConnect(socket, io));
  return io;
}

export async function emitSocket(room, objectId, event, data) {
  io.to(`/${room}/${objectId}`).emit(event, data);
}

export async function emitToAdmin(event, data) {
  admin.emit(event, data);
}

export { io, admin };
