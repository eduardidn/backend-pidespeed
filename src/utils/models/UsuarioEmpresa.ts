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
    cedula: String,
    img: {
      type: Schema.Types.ObjectId,
      ref: "file",
      default: "6018afec5ad8524648ca8216",
    },
    vehicle_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
    },
    vehicle_type: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["disponible", "ocupado", "offline"],
      default: "offline",
    },
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
    coordinates: String,
    type: {
      type: String,
      required: [true, "type is required"],
      enum: ["delivery", "empresa"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "empresa",
    },
    empresaDelivery: {
      type: Schema.Types.ObjectId,
      ref: "empresaDelivery",
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

export default model("usuarioEmpresa", Utils.prepare(schema));
