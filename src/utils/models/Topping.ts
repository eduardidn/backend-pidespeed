import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    cantidad: {
      type: Number,
      required: [true, "cantidad is required"],
    },
    publish: {
      type: Boolean,
      required: [true, "publish is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
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

export default model("topping", Utils.prepare(schema));
