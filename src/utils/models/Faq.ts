import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
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

export default model("faq", Utils.prepare(schema));
