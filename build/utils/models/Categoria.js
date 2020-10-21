"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    ruta: {
        type: String,
        required: [true, "ruta is required"],
    },
    icono: {
        type: String,
        default: "",
    },
    publish: {
        type: Number,
        required: [true, "publish is required"],
    },
    prev_id: Number,
}, {
    timestamps: true,
    minimize: false,
    versionKey: false,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
    toObject: {
        virtuals: true,
    },
});
exports.default = mongoose_1.model("categoria", _1.Utils.prepare(schema));
