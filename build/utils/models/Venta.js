"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    pedido: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "pedido",
        required: [true, "pedido is required"],
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
        required: [true, "empresa is required"],
    },
    total: {
        type: String,
        required: [true, "nombre is required"],
    },
    delivery: {
        type: String,
        required: [true, "delivery is required"],
    },
    moneda: {
        type: String,
        default: "BSS",
    },
    pagado: {
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
exports.default = mongoose_1.model("venta", _1.Utils.prepare(schema));
