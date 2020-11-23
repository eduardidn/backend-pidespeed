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
exports.listFiles = exports.deleteFile = exports.move = exports.uploadFileFromPath = exports.makePublic = exports.storage = exports.googleJsonPath = void 0;
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
exports.googleJsonPath = path_1.default.resolve(__dirname, "../../../google-storage-service-account.json");
const configStorage = {
    projectId: "tensile-ethos-293713",
    keyFilename: exports.googleJsonPath,
};
exports.storage = new storage_1.Storage(configStorage);
function makePublic(bucketName, filename) {
    return exports.storage.bucket(bucketName).file(filename).makePublic();
}
exports.makePublic = makePublic;
function uploadFileFromPath(bucketName, file, metadata = {
    cacheControl: "public, max-age=31536000",
    contentType: file.mimetype,
}) {
    return exports.storage.bucket(bucketName).upload(file, {
        gzip: true,
        metadata: {
            cacheControl: metadata.cacheControl || "public, max-age=31536000",
            contentType: metadata.contentType || file.mimetype,
        },
    });
}
exports.uploadFileFromPath = uploadFileFromPath;
function move(bucketName, srcFilename, destFilename) {
    return exports.storage.bucket(bucketName).file(srcFilename).move(destFilename);
}
exports.move = move;
function deleteFile(bucketName, filename) {
    return exports.storage.bucket(bucketName).file(filename).delete();
}
exports.deleteFile = deleteFile;
function listFiles(bucketName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Lists files in the bucket
        const [files] = yield exports.storage
            .bucket(bucketName)
            .getFiles({ prefix: "zonas/" });
        files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            yield makePublic(bucketName, file.name);
            // console.log(file.name);
        }));
    });
}
exports.listFiles = listFiles;
