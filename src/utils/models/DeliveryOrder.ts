import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    codigo: {
      type: String,
      required: [true, "codigo is required"],
    },
    moneda: {
      type: String,
      default: "BSS",
    },
    precio: {
      type: String,
      required: [true, "precio is required"],
    },
    to_go: {
      type: Boolean,
      required: [true, "to_go is required"],
    },
    delivery: {
      type: Object,
      required: [true, "precio is required"],
    },
    precio_delivery: {
      type: Number,
      required: [true, "precio_delivery is required"],
    },
    terminado: {
      type: Boolean,
      required: [true, "terminado is required"],
    },
    entregado: {
      type: Boolean,
      required: [true, "entregado is required"],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "usuario is required"],
    },
    deliveryCompany: {
      type: Schema.Types.ObjectId,
      ref: "empresaDelivery",
      required: [true, "empresa is required"],
    },
    pedido: {
      type: Schema.Types.ObjectId,
      ref: "pedido",
      required: [true, "pedido is required"],
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

export default model("deliveryOrder", Utils.prepare(schema));
