"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    publish: {
        type: Number,
        required: [true, "publish is required"],
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categoria",
        required: [true, "categoria is required"],
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
exports.default = mongoose_1.model("categoriaProducto", _1.Utils.prepare(schema));
