import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
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
    enail_pagos: {
      type: String,
      required: [true, "enail_pagos is required"],
    },
    telefono: {
      type: String,
      required: [true, "telefono is required"],
    },
    promo: {
      type: Number,
      required: [true, "promo is required"],
    },
  },
  {
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
  },
);

export default model("config", Utils.prepare(schema));
