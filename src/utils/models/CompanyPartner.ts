import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    coordinates: {
      type: String,
      required: [true, "coordinates is required"],
    },
    addresss: {
      type: String,
      required: [true, "addresss is required"],
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: [true, "image is required"],
    },
    sales: {
      type: Number,
      default: 0,
    },
    publish: {
      type: Boolean,
      required: [true, "publish is required"],
    },
    deliveryCompany: {
      type: Schema.Types.ObjectId,
      ref: "empresaDelivery",
      required: [true, "empresaDelivery is required"],
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

export default model("companyPartner", Utils.prepare(schema));
