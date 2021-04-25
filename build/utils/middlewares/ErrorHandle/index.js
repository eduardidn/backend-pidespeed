"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
function default_1(err, req, res, next) {
    return err.statusCode
        ? ErrorHandler_1.default.clientError(err, req, res, next)
        : ErrorHandler_1.default.serverError(err, req, res, next);
}
exports.default = default_1;
