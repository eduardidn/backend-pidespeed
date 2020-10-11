"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require(".");
const schema = new mongoose_1.Schema({
    cuenta: {
        type: String,
        required: [true, "cuenta is required"],
    },
    banco: {
        type: String,
        required: [true, "banco is required"],
    },
    pago_movil: {
        type: String,
        default: "",
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
exports.default = mongoose_1.model("cuenta", _1.Utils.prepare(schema));
