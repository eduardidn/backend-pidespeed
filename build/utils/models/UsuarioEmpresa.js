"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    cedula: {
        type: String,
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
    telefono: {
        type: String,
        required: [true, "telefono is required"],
    },
    type: {
        type: String,
        required: [true, "type is required"],
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
exports.default = mongoose_1.model("usuarioEmpresa", _1.Utils.prepare(schema));
