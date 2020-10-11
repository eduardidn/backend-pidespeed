"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
        required: [true, "empresa is required"],
    },
    ventas: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "venta",
            required: [true, "ventas is required"],
        },
    ],
    transferencia: {
        type: String,
        required: [true, "transferencia is required"],
    },
    total: {
        type: String,
        required: [true, "total is required"],
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
exports.default = mongoose_1.model("pago", _1.Utils.prepare(schema));
