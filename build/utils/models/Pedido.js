"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    codigo: {
        type: String,
        required: [true, "codigo is required"],
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "usuario",
        required: [true, "usuario is required"],
    },
    precio: {
        type: String,
        required: [true, "precio is required"],
    },
    moneda: {
        type: String,
        default: "BSS",
    },
    file: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
        required: [true, "file is required"],
    },
    banco: {
        type: String,
        required: [true, "banco is required"],
    },
    tipo_pago: {
        type: String,
        required: [true, "tipo_pago is required"],
    },
    referencia: {
        type: String,
        required: [true, "referencia is required"],
    },
    to_go: {
        type: Number,
        required: [true, "to_go is required"],
    },
    delivery: {
        type: Object,
        required: [true, "delivery is required"],
    },
    cancelado: {
        type: Number,
        default: 0,
    },
    aprobado: {
        type: Number,
        default: 0,
    },
    terminado: {
        type: Number,
        default: 0,
    },
    entregado: {
        type: Number,
        default: 0,
    },
    promo: {
        type: Number,
        default: 0,
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
exports.default = mongoose_1.model("pedido", _1.Utils.prepare(schema));
