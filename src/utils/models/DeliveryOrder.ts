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
    state: {
      type: String,
      enum: ["delivered", "inProcess", "waiting"],
      default: "waiting",
    },
    coords: [String],
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
    assignedWorker: {
      type: Schema.Types.ObjectId,
      ref: "usuarioEmpresa",
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
