import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    url: {
      type: String,
      required: [true, "url is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
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

export default model("file", Utils.prepare(schema));
