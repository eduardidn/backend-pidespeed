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
const node_forge_1 = __importDefault(require("node-forge"));
const vector = "SNCKJFNRKKDNCJDOETNCKRCNCDHCBF";
function crypt(id, str) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = _hash(String(id));
        const encoded = yield encryptText(key, String(str));
        return node_forge_1.default.util.encode64(`${key}$${encoded}`);
    });
}
function decrypt(str) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = node_forge_1.default.util.decode64(String(str));
        if (!text.includes("$"))
            return false;
        const key = text.split("$")[0];
        const encoded = text.split("$")[1];
        return decryptText(key, encoded);
    });
}
function encryptText(key, str) {
    return __awaiter(this, void 0, void 0, function* () {
        const cipher = node_forge_1.default.cipher.createCipher("AES-CBC", key);
        cipher.start({ iv: vector });
        cipher.update(node_forge_1.default.util.createBuffer(str));
        cipher.finish();
        return node_forge_1.default.util.encode64(cipher.output.data);
    });
}
function decryptText(key, encoded) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = node_forge_1.default.util.decode64(encoded);
        const decipher = node_forge_1.default.cipher.createDecipher("AES-CBC", key);
        decipher.start({ iv: vector });
        decipher.update(node_forge_1.default.util.createBuffer(decoded));
        decipher.finish();
        return decipher.output.data;
    });
}
function _hash(id) {
    const text = String(id);
    let result = "";
    for (let i = 0; i < 32; i++) {
        result += text.charAt(Math.floor(Math.random() * text.length));
    }
    return result;
}
exports.default = {
    crypt,
    decrypt,
};
