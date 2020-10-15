import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    publish: {
      type: Number,
      required: [true, "publish is required"],
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "categoria",
      required: [true, "categoria is required"],
    },
    prev_id: Number,
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

export default model("categoriaProducto", Utils.prepare(schema));
