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
exports.io = exports.emitSocket = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const TokenUtils_1 = __importDefault(require("./TokenUtils"));
let io;
exports.io = io;
function default_1(httpServer) {
    exports.io = io = socket_io_1.default(httpServer, {
        pingInterval: 20000,
        pingTimeout: 10000,
    });
    io.use(middleware);
    return io;
}
exports.default = default_1;
function middleware(socket, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const invalidSession = () => {
            socket.disconnect();
            return next(new Error("Not authorized."));
        };
        const { authorization } = socket.handshake.query;
        if (!authorization)
            return invalidSession();
        const { valid, data } = yield TokenUtils_1.default.validateToken({
            token: authorization,
        });
        if (!valid)
            return invalidSession();
        socket.emit("Joined with success");
        socket.join(`/user/${data.userId}`);
        return next();
    });
}
function emitSocket(userId, event, data) {
    return __awaiter(this, void 0, void 0, function* () {
        io.to(`/user/${userId}`).emit(event, data);
    });
}
exports.emitSocket = emitSocket;
