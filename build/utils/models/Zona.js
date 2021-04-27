"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    detalle: String,
    coordenadas: {
        type: Object,
        required: [true, "coordenadas is required"],
    },
    img: {
        type: String,
        required: [true, "img is required"],
    },
    ciudad: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ciudad",
        required: [true, "ciudad is required"],
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
exports.default = mongoose_1.model("zona", _1.Utils.prepare(schema));
