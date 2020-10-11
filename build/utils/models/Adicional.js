"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    precio$: {
        type: String,
        default: 0,
    },
    precio: {
        type: String,
        required: [true, "precio is required"],
    },
    cantidad: {
        type: Number,
        required: [true, "cantidad is required"],
    },
    publish: {
        type: Number,
        required: [true, "publish is required"],
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
        required: [true, "empresa is required"],
    },
    productos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "producto",
            required: [true, "productos is required"],
        },
    ],
    consulta: {
        type: Number,
        required: [true, "consulta is required"],
    },
    acomp: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "acomp",
    },
    tipo_acomp: {
        type: String,
        default: "",
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
exports.default = mongoose_1.model("adicional", _1.Utils.prepare(schema));
