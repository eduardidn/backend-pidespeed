"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre_producto: {
        type: String,
        required: [true, "nombre_producto is required"],
    },
    producto: {
        ttype: mongoose_1.Schema.Types.ObjectId,
        ref: "producto",
        required: [true, "producto is required"],
    },
    precio_producto: {
        type: String,
        required: [true, "precio_producto is required"],
    },
    acomp: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "acomp is required"],
    },
    add: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "add is required"],
    },
    cantidad: {
        type: Number,
        required: [true, "cantidad is required"],
    },
    to_go: {
        type: String,
        required: [true, "to_go is required"],
    },
    delivey: {
        type: String,
        required: [true, "delivey is required"],
    },
    total: {
        type: String,
        required: [true, "total is required"],
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
exports.default = mongoose_1.model("detallePedido", _1.Utils.prepare(schema));
