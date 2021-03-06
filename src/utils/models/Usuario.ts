import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "nombre is required"],
    },
    apellido: {
      type: String,
      required: [true, "apellido is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    cedula: {
      type: String,
      required: [true, "cedula is required"],
    },
    img: String,
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    direccion: Array,
    telefono1: {
      type: String,
      required: [true, "telefono1 is required"],
    },
    compras: {
      type: Number,
      default: 0,
    },
    verificado: {
      type: Number,
      default: 0,
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

export default model("usuario", Utils.prepare(schema));
