"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, "titulo is required"],
    },
    contenido: {
        type: String,
        required: [true, "contenido is required"],
    },
    order: {
        type: Number,
        required: [true, "order is required"],
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
exports.default = mongoose_1.model("faq", _1.Utils.prepare(schema));
