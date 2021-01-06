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
    telefono: {
        type: String,
        required: [true, "telefono is required"],
    },
    ciudad: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ciudad",
        required: [true, "ciudad  is required"],
    },
    estado: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "estado",
        required: [true, "estado is required"],
    },
    logo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
        default: "5fa5b4bdb6dac50570af1a1b",
    },
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
exports.default = mongoose_1.model("empresaDelivey", _1.Utils.prepare(schema));
