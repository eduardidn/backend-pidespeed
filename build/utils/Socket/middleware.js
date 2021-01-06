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
exports.adminMiddleware = exports.middleware = void 0;
const TokenUtils_1 = __importDefault(require("../TokenUtils"));
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
        if (data.empresa !== true) {
            setTimeout(() => socket.emit("Joined with success"), 1000);
            socket.join(`/user/${data.userId}`);
        }
        else {
            setTimeout(() => socket.emit("Joined with success"), 1000);
            socket.join(`/empresa/${data.userId}`);
            socket.join(`/empresa/${data.adminId}`);
        }
        return next();
    });
}
exports.middleware = middleware;
function adminMiddleware(socket, next) {
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
        if (!valid || data.admin !== true)
            return invalidSession();
        setTimeout(() => socket.emit("Joined with success"), 1000);
        socket.join(`/admin/${data.userId}`);
        socket.join(`/admin/${data.adminId}`);
        return next();
    });
}
exports.adminMiddleware = adminMiddleware;
