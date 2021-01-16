import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    ruta: {
      type: String,
      required: [true, "ruta is required"],
    },
    telefono: {
      type: String,
      required: [true, "telefono is required"],
    },
    ciudad: {
      type: Schema.Types.ObjectId,
      ref: "ciudad",
      required: [true, "ciudad  is required"],
    },
    estado: {
      type: Schema.Types.ObjectId,
      ref: "estado",
      required: [true, "estado is required"],
    },
    img: {
      type: Schema.Types.ObjectId,
      ref: "file",
      default: "5fa5b438e8a25c36c0fe1f52",
    },
    logo: {
      type: Schema.Types.ObjectId,
      ref: "file",
      default: "5fa5b4bdb6dac50570af1a1b",
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

export default model("empresaDelivey", Utils.prepare(schema));
