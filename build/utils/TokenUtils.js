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
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TokenCrypt_1 = __importDefault(require("./TokenCrypt"));
const PKPath = path_1.default.resolve(__dirname, "../../jwt.pem");
const PK = fs_1.default.readFileSync(PKPath);
function _createToken(key, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedContent = yield TokenCrypt_1.default.crypt(String(key), JSON.stringify(content));
        const token = jsonwebtoken_1.sign({
            token: encryptedContent,
        }, PK, {
            expiresIn: "2d",
        });
        return TokenCrypt_1.default.crypt(String(key), token);
    });
}
function createBussinesToken({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _createToken(id, {
            id,
        });
    });
}
function createAdminToken({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _createToken(id, {
            id,
        });
    });
}
function createUserToken({ user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: userId } = user;
        return _createToken(userId, {
            userId,
        });
    });
}
function validateToken({ token }) {
    return __awaiter(this, void 0, void 0, function* () {
        token = token.split(" ")[0];
        const jwt = yield TokenCrypt_1.default.decrypt(token);
        const invalid = (expired = false) => ({
            valid: false,
            expired,
            data: undefined,
        });
        const valid = (info) => ({ valid: true, expired: false, data: info });
        if (!jwt)
            return invalid(false);
        try {
            const jwtData = jsonwebtoken_1.verify(jwt, PK, {});
            if (!jwtData.token)
                return invalid(false);
            const data = yield TokenCrypt_1.default.decrypt(jwtData.token);
            const userData = JSON.parse(data);
            return valid(userData);
        }
        catch (error) {
            return invalid(false);
        }
    });
}
function needValidate(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const whitelist = [""];
        const whiteListEndsWidth = [""];
        for (const wlUrl of whiteListEndsWidth)
            if (url.endsWith(wlUrl))
                return false;
        for (const wlUrl of whitelist)
            if (url.startsWith(wlUrl))
                return false;
        return true;
    });
}
exports.default = {
    createUserToken,
    createBussinesToken,
    createAdminToken,
    needValidate,
    validateToken,
};
