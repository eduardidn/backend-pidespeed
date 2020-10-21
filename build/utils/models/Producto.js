"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    precio: {
        type: Number,
        required: [true, "precio is required"],
    },
    precio1_dl: {
        type: String,
    },
    precio1: {
        type: String,
        required: [true, "precio1 is required"],
    },
    moneda: {
        type: String,
        default: "BSS",
    },
    descripcion: {
        type: String,
        required: [true, "descripcion is required"],
    },
    categoria_product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categoriaProduct",
        required: [true, "categoria_product is required"],
    },
    acomp: {
        type: Number,
        default: 0,
    },
    add: {
        type: Object,
        default: 0,
    },
    bebida: {
        type: Object,
        default: 0,
    },
    topping: {
        type: Object,
        default: 0,
    },
    sirope: {
        type: Object,
        default: 0,
    },
    tamanos: {
        type: Object,
        default: 0,
    },
    sabores: {
        type: Object,
        default: 0,
    },
    mismo_precio: {
        type: Number,
        default: 0,
    },
    en_local: {
        type: Number,
        required: [true, "en_local is required"],
    },
    to_go: {
        type: String,
        default: 1,
    },
    to_go$: {
        type: String,
        default: 0,
    },
    acomp_product: {
        type: Number,
        default: 0,
    },
    file: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
        required: [true, "file is required"],
    },
    cantidad: {
        type: Number,
        required: [true, "cantidad is required"],
    },
    ventas: {
        type: Number,
        default: 0,
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
exports.default = mongoose_1.model("producto", _1.Utils.prepare(schema));
