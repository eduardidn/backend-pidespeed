import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    estado: {
      type: Schema.Types.ObjectId,
      ref: "estado",
      required: [true, "estado is required"],
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

export default model("ciudad", Utils.prepare(schema));
