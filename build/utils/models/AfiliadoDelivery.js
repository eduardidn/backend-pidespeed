"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    descripcion: {
        type: String,
        required: [true, "descripcion is required"],
    },
    coordenadas: {
        type: String,
        required: [true, "coordenadas is required"],
    },
    direccion: {
        type: String,
        required: [true, "direccion is required"],
    },
    img: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
        required: [true, "img is required"],
    },
    ventas: {
        type: Number,
        default: 0,
    },
    publish: {
        type: Boolean,
        required: [true, "publish is required"],
    },
    empresaDelivery: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresaDelivery",
        required: [true, "empresaDelivery is required"],
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
exports.default = mongoose_1.model("afiliadoDelivery", _1.Utils.prepare(schema));
