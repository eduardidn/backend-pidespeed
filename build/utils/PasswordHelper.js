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
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashSize = 2 << 5;
const hashIterations = 100;
const hashDigest = "sha512";
function hash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [buffer, salt] = yield Promise.all([
                    Buffer.alloc(hashSize * 2),
                    crypto_1.default.randomBytes(hashSize),
                ]);
                salt.copy(buffer);
                const callback = (error, key) => {
                    if (error)
                        return reject(error);
                    key.copy(buffer, salt.length);
                    resolve(buffer.toString("base64"));
                };
                crypto_1.default.pbkdf2(password, salt, hashIterations, hashSize, hashDigest, callback);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
function compare(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const buffer = Buffer.from(hash, "base64");
                const salt = buffer.slice(0, hashSize);
                const hashFromBuffer = buffer.slice(hashSize, hashSize * 2);
                const callback = (error, key) => {
                    if (error)
                        return reject(error);
                    resolve(hashFromBuffer.compare(key) === 0);
                };
                crypto_1.default.pbkdf2(password, salt, hashIterations, hashSize, hashDigest, callback);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
/**
 * FUNCIONES DE PASSWORD PARA USUARIOS
 */
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(password, salt);
        return hash;
    });
}
function matchPassword(password, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(password, savedPassword);
    });
}
exports.default = {
    hash,
    compare,
    encryptPassword,
    matchPassword,
};
