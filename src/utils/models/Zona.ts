import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    detalles: {
      type: String,
      required: [true, "detalles is required"],
    },
    coordenadas: {
      type: String,
      required: [true, "coordenadas is required"],
    },
    img: {
      type: String,
      required: [true, "img is required"],
    },
    ciudad: {
      type: Schema.Types.ObjectId,
      ref: "ciudad",
      required: [true, "ciudad is required"],
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

export default model("zona", Utils.prepare(schema));
