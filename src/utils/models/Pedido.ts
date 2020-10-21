import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    codigo: {
      type: String,
      required: [true, "codigo is required"],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "usuario is required"],
    },
    precio: {
      type: String,
      required: [true, "precio is required"],
    },
    moneda: {
      type: String,
      default: "BSS",
    },
    file: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: [true, "file is required"],
    },
    banco: {
      type: String,
      required: [true, "banco is required"],
    },
    tipo_pago: {
      type: String,
      required: [true, "tipo_pago is required"],
    },
    referencia: {
      type: String,
      required: [true, "referencia is required"],
    },
    to_go: {
      type: Number,
      required: [true, "to_go is required"],
    },
    delivery: {
      type: Object,
      required: [true, "delivery is required"],
    },
    cancelado: {
      type: Number,
      required: [true, "cancelado is required"],
    },
    aprobado: {
      type: Number,
      required: [true, "aprobado is required"],
    },
    terminado: {
      type: Number,
      required: [true, "terminado is required"],
    },
    entregado: {
      type: Number,
      required: [true, "entrgado is required"],
    },
    promo: {
      type: Number,
      required: [true, "promo is required"],
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

export default model("pedido", Utils.prepare(schema));
