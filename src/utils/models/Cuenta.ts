import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
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

export default model("cuenta", Utils.prepare(schema));
