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
exports.admin = exports.io = exports.emitToAdmin = exports.emitSocket = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const connection_1 = require("./connection");
const middleware = __importStar(require("./middleware"));
let io;
exports.io = io;
let admin;
exports.admin = admin;
function default_1(httpServer) {
    exports.io = io = socket_io_1.default(httpServer, {
        pingInterval: 20000,
        pingTimeout: 10000,
    });
    io.use(middleware.middleware);
    exports.admin = admin = io.of("/admin");
    admin.use(middleware.adminMiddleware);
    io.on("connect", (socket) => connection_1.onConnect(socket, io));
    return io;
}
exports.default = default_1;
function emitSocket(room, objectId, event, data) {
    return __awaiter(this, void 0, void 0, function* () {
        io.to(`/${room}/${objectId}`).emit(event, data);
    });
}
exports.emitSocket = emitSocket;
function emitToAdmin(event, data) {
    return __awaiter(this, void 0, void 0, function* () {
        admin.emit(event, data);
    });
}
exports.emitToAdmin = emitToAdmin;
