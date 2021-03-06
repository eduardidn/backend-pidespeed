import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    precio$: {
      type: String,
      default: 0,
    },
    precio: {
      type: String,
      required: [true, "precio is required"],
    },
    cantidad: {
      type: Number,
      required: [true, "cantidad is required"],
    },
    publish: {
      type: Boolean,
      required: [true, "publish is required"],
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
      required: [true, "empresa is required"],
    },
    acomps: Array,
    consulta: {
      type: Number,
      required: [true, "consulta is required"],
    },
    acomp: {
      type: Schema.Types.ObjectId,
      ref: "acomp",
    },
    tipo_acomp: {
      type: String,
      default: "",
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

export default model("adicional", Utils.prepare(schema));
