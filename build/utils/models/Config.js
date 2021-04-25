"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    tasa_dt: {
        type: String,
        required: [true, "tasa_dt is required"],
    },
    tasa_bcv: {
        type: String,
        required: [true, "tasa_bcv is required"],
    },
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    rif: {
        type: String,
        required: [true, "rif is required"],
    },
    email_pagos: {
        type: String,
        required: [true, "email_pagos is required"],
    },
    telefono: {
        type: String,
        required: [true, "telefono is required"],
    },
    promo: {
        type: Number,
        required: [true, "promo is required"],
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
exports.default = mongoose_1.model("config", _1.Utils.prepare(schema));
