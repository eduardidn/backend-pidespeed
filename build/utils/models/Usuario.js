"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    apellido: {
        type: String,
        required: [true, "apellido is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    cedula: {
        type: String,
        required: [true, "cedula is required"],
    },
    img: String,
    username: {
        type: String,
        required: [true, "username is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    direccion: Array,
    telefono1: {
        type: String,
        required: [true, "telefono1 is required"],
    },
    compras: {
        type: Number,
        default: 0,
    },
    verificado: {
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
exports.default = mongoose_1.model("usuario", _1.Utils.prepare(schema));
