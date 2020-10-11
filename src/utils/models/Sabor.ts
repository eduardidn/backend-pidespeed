import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    precio$: {
      type: String,
      default: 0,
    },
    precio: {
      type: String,
      required: [true, "precio is required"],
    },
    cantidad: {
      type: Number,
      required: [true, "cantidad is required"],
    },
    publish: {
      type: Number,
      required: [true, "publish is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
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

export default model("sabor", Utils.prepare(schema));
