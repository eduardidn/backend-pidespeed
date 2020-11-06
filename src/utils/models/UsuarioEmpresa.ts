import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    nombre: {
      type: String,
    },
    apellido: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    cedula: {
      type: String,
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
    telefono: {
      type: String,
      required: [true, "telefono is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
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

export default model("usuarioEmpresa", Utils.prepare(schema));
