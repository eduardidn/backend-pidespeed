"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    suffix: {
        type: String,
        required: [true, "suffix is required"],
    },
    ruta: {
        type: String,
        required: [true, "ruta is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    rif: {
        type: String,
        required: [true, "rif is required"],
    },
    telefono: {
        type: String,
        required: [true, "telefono is required"],
    },
    username: {
        type: String,
        required: [true, "telefono is required"],
    },
    password: {
        type: String,
        required: [true, "telefono is required"],
    },
    logo: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "",
    },
    descripcion: {
        type: String,
    },
    keywords: {
        type: String,
    },
    direccion: {
        type: String,
        required: [true, "direccion is required"],
    },
    coordenadas: {
        type: String,
    },
    ciudad: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ciudad",
        required: [true, "ciudad is required"],
    },
    estado: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "estado",
        required: [true, "estado is required"],
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categoria",
        required: [true, "categoria is required"],
    },
    subcategoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "subcategoria",
    },
    horarios: Object,
    contacto: Object,
    visitas: {
        type: Number,
        default: 0,
    },
    ventas: {
        type: Number,
        default: 0,
    },
    porcentaje: {
        type: Number,
        default: 5,
    },
    publish: {
        type: Number,
        default: 0,
    },
    prueba: {
        type: Number,
        default: 0,
    },
    modDollar: Number,
    redondear_precio: Number,
    tasa_dt: Number,
    tasa_bcv: Number,
    tasa: Number,
    en_local: {
        type: Number,
        required: [true, "en_local is required"],
    },
    delivery: Object,
    porcent_mas: Number,
    tiene_sucursal: Number,
    es_sucursal: Number,
    principal: Number,
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
    },
    abierto: {
        type: Number,
        default: 0,
    },
    mensaje_carrito: String,
    orden: Array,
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
exports.default = mongoose_1.model("empresa", _1.Utils.prepare(schema));
