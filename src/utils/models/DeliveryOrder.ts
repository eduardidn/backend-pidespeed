import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
    },
    currency: {
      type: String,
      default: "BSS",
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },
    to_go: {
      type: Boolean,
      required: [true, "to_go is required"],
    },
    delivery: {
      type: Object,
      required: [true, "precio is required"],
    },
    finished: {
      type: Boolean,
      required: [true, "finished is required"],
    },
    delivered: {
      type: Boolean,
      required: [true, "delivered is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "user is required"],
    },
    deliveryCompany: {
      type: Schema.Types.ObjectId,
      ref: "empresaDelivey",
      default: "5fcd3afc64e32d421c2e579b",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "pedido",
      required: [true, "order is required"],
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
