"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    codigo: {
        type: String,
        required: [true, "codigo is required"],
    },
    precio: {
        type: String,
        required: [true, "precio is required"],
    },
    to_go: {
        type: Number,
        required: [true, "to_go is required"],
    },
    delivery: {
        type: String,
        required: [true, "precio is required"],
    },
    precio_delivery: {
        type: Number,
        required: [true, "precio_delivery is required"],
    },
    terminado: {
        type: Number,
        required: [true, "terminado is required"],
    },
    entregado: {
        type: Number,
        required: [true, "entregado is required"],
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "usuario",
        required: [true, "usuario is required"],
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
        required: [true, "empresa is required"],
    },
    pedido: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "pedido",
        required: [true, "pedido is required"],
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
exports.default = mongoose_1.model("empresaPedido", _1.Utils.prepare(schema));
