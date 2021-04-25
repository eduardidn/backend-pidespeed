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
const TokenUtils_1 = __importDefault(require("../../TokenUtils"));
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const invalid = (expired = false) => res.status(401).json({
            message: `${expired ? "Expired" : "Invalid"} institution session`,
        });
        const { business, needValidate } = req.headers;
        if (needValidate) {
            if (!business)
                return invalid(false);
            const { valid, expired, data } = yield TokenUtils_1.default.validateToken({
                token: business,
            });
            if (!valid)
                return invalid(expired);
            req.business = data;
            return next();
        }
    });
}
exports.default = default_1;
