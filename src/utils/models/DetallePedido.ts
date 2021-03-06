import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre_producto: {
      type: String,
      required: [true, "nombre_producto is required"],
    },
    producto: {
      type: Schema.Types.ObjectId,
      ref: "producto",
      required: [true, "producto is required"],
    },
    precio_producto: {
      type: String,
      required: [true, "precio_producto is required"],
    },
    acomp: {
      type: Object,
      required: [true, "acomp is required"],
    },
    add: {
      type: Object,
      required: [true, "add is required"],
    },
    cantidad: {
      type: Number,
      required: [true, "cantidad is required"],
    },
    to_go: {
      type: String,
      required: [true, "to_go is required"],
    },
    delivery: {
      type: String,
      required: [true, "delivery is required"],
    },
    total: {
      type: String,
      required: [true, "total is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
    },
    pedido: {
      type: Schema.Types.ObjectId,
      ref: "pedido",
      required: [true, "pedido is required"],
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

export default model("detallePedido", Utils.prepare(schema));
