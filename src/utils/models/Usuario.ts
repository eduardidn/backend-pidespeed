import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {},
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

export default model("usuario", Utils.prepare(schema));
