import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    descripcion: {
      type: String,
      required: [true, "descripcion is required"],
    },
    coordenadas: {
      type: String,
      required: [true, "coordenadas is required"],
    },
    direccion: {
      type: String,
      required: [true, "direccion is required"],
    },
    img: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: [true, "img is required"],
    },
    ventas: {
      type: Number,
      default: 0,
    },
    publish: {
      type: Boolean,
      required: [true, "publish is required"],
    },
    empresaDelivery: {
      type: Schema.Types.ObjectId,
      ref: "empresaDelivery",
      required: [true, "empresaDelivery is required"],
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

export default model("afiliadoDelivery", Utils.prepare(schema));
