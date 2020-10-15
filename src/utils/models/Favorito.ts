import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "usuario is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "categoria",
      required: [true, "categoria is required"],
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

export default model("favorito", Utils.prepare(schema));
