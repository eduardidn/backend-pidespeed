import TokenUtils from "../TokenUtils";

export async function middleware(socket, next) {
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
  if (data.empresa !== true) {
    setTimeout(() => socket.emit("Joined with success"), 1000);
    socket.join(`/user/${data.userId}`);
  } else {
    setTimeout(() => socket.emit("Joined with success"), 1000);
    socket.join(`/user/${data.userId}`);
    socket.join(`/empresa/${data.companyId}`);
  }
  return next();
}

export async function adminMiddleware(socket, next) {
  const invalidSession = () => {
    socket.disconnect();
    return next(new Error("Not authorized."));
  };
  const { authorization } = socket.handshake.query;

  if (!authorization) return invalidSession();

  const { valid, data } = await TokenUtils.validateToken({
    token: authorization,
  });
  if (!valid || data.admin !== true) return invalidSession();

  setTimeout(() => socket.emit("Joined with success"), 1000);

  socket.join(`/admin/${data.userId}`);
  socket.join(`/admin/${data.adminId}`);
  return next();
}
