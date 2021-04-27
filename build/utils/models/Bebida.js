"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre is required"],
    },
    cantidad: {
        type: Number,
        required: [true, "cantidad is required"],
    },
    publish: {
        type: Boolean,
        required: [true, "publish is required"],
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "empresa",
        required: [true, "empresa is required"],
    },
    tipoBebida: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "tipoBebida",
        required: [true, "tipoBebida is required"],
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
exports.default = mongoose_1.model("bebida", _1.Utils.prepare(schema));
