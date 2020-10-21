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
    icono: {
      type: String,
      default: "",
    },
    publish: {
      type: Number,
      required: [true, "publish is required"],
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

export default model("categoria", Utils.prepare(schema));
