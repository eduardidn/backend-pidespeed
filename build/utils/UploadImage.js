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
exports.getImgData = exports.deleteImage = exports.listFiles = exports.uploadTest = exports.uploadBase64 = void 0;
const GoogleStorage = __importStar(require("./GoogleStorage"));
const _models_1 = require("@models");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const BUCKETNAME = "pidespeed-storage";
function uploadBase64({ imageBuffer, filename, folder, update, id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = `${crypto_1.default.randomBytes(10).toString("hex")}-${filename}`;
        const filePath = `tmp/${fileName}`;
        const imagesPath = `${folder}/${fileName}`;
        if (!fs_1.default.existsSync("./tmp/"))
            fs_1.default.mkdirSync("./tmp", 0o766);
        yield fs_1.default.writeFileSync(filePath, imageBuffer.data);
        yield GoogleStorage.uploadFileFromPath(BUCKETNAME, filePath);
        yield GoogleStorage.move(BUCKETNAME, fileName, imagesPath);
        yield GoogleStorage.makePublic(BUCKETNAME, imagesPath);
        if (update) {
            const file = yield getImage({ id });
            yield GoogleStorage.deleteFile(BUCKETNAME, file.url);
            return updateImage({ id, url: imagesPath, type: folder });
        }
        return saveImage({
            url: imagesPath,
            type: folder,
        });
    });
}
exports.uploadBase64 = uploadBase64;
function uploadTest(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = `../server/build/img/empresas/${fileName}`;
        const imagesPath = `empresas/${fileName}`;
        yield GoogleStorage.uploadFileFromPath(BUCKETNAME, filePath);
        yield GoogleStorage.move(BUCKETNAME, fileName, imagesPath);
        yield GoogleStorage.makePublic(BUCKETNAME, imagesPath);
        return "ok";
    });
}
exports.uploadTest = uploadTest;
function listFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        yield GoogleStorage.listFiles(BUCKETNAME);
    });
}
exports.listFiles = listFiles;
function saveImage({ url, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url)
            throw new Error("Url is not defined");
        return _models_1.File.create({ url, type });
    });
}
function getImage({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.File.findOne({ _id: id }).exec();
    });
}
function updateImage({ id, url, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url)
            throw new Error("Url is not defined");
        return _models_1.File.findOneAndUpdate({ _id: id }, { url, type }, { new: true });
    });
}
function deleteImage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield _models_1.File.findOneAndDelete({ _id: id });
        return GoogleStorage.deleteFile(BUCKETNAME, file.url);
    });
}
exports.deleteImage = deleteImage;
function getImgData(data) {
    const value = data.image.split(",")[1];
    const type = data.image.split(",")[0].split(";")[0].split("/")[1];
    const filename = `${data.cedula}-${data.empresa}`;
    const image = Buffer.from(value, "base64");
    const imageBuffer = {
        type,
        image,
    };
    return { imageBuffer, filename };
}
exports.getImgData = getImgData;
