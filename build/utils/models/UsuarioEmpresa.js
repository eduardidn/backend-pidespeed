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
    cedula: String,
    img: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
        default: "6018afec5ad8524648ca8216",
    },
    vehicle_image: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "file",
    },
    vehicle_type: String,
    disabled: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["disponible", "ocupado", "offline"],
        default: "offline",
    },
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
    coordinates: String,
    type: {
        type: String,
        required: [true, "type is required"],
        enum: ["delivery", "empresa"],
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "role",
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
    },
    empresaDelivery: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresaDelivery",
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
exports.default = mongoose_1.model("usuarioEmpresa", _1.Utils.prepare(schema));
