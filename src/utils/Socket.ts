import socketIo from "socket.io";

import TokenUtils from "./TokenUtils";

let io;

export default function (httpServer) {
  io = socketIo(httpServer, {
    pingInterval: 20000,
    pingTimeout: 10000,
  });
  io.use(middleware);
  return io;
}

async function middleware(socket, next) {
  const invalidSession = () => {
    socket.disconnect();
    return next(new Error("Not authorized."));
  };
  const { authorization } = socket.handshake.query;

  if (!authorization) return invalidSession();

  const { valid, data } = await TokenUtils.validateToken({
    token: authorization,
  });
  if (!valid) return invalidSession();

  socket.emit("Joined with success");

  socket.join(`/user/${data.userId}`);

  return next();
}

export async function emitSocket(userId, event, data) {
  io.to(`/user/${userId}`).emit(event, data);
}

export { io };
