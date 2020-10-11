import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    pedido: {
      type: Schema.Types.ObjectId,
      ref: "pedido",
      required: [true, "pedido is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
    },
    total: {
      type: String,
      required: [true, "nombre is required"],
    },
    delivery: {
      type: String,
      required: [true, "delivery is required"],
    },
    moneda: {
      type: String,
      required: [true, "moneda is required"],
    },
    pagado: {
      type: Number,
      required: [true, "pagado is required"],
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

export default model("venta", Utils.prepare(schema));
