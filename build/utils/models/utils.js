"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
function prepare(schema) {
    schema.plugin(mongoose_lean_virtuals_1.default);
    return schema;
}
exports.prepare = prepare;
