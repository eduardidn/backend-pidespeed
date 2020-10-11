import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
    },
    ventas: [
      {
        type: Schema.Types.ObjectId,
        ref: "venta",
        required: [true, "ventas is required"],
      },
    ],
    transferencia: {
      type: String,
      required: [true, "transferencia is required"],
    },
    total: {
      type: String,
      required: [true, "total is required"],
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

export default model("pago", Utils.prepare(schema));
