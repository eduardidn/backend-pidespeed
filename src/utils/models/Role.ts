import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    name: String,
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

export default model("role", Utils.prepare(schema));
