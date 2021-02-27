import { HTTP400Error } from "../../utils";
import * as service from "./service";

export async function uploadImage(req, res) {
  const { filetype: type, value, filename, folder, update, id } = req.body;
  const data = Buffer.from(value, "base64");
  const imageBuffer = {
    type,
    data,
  };
  return service
    .uploadImage({ imageBuffer, folder, filename, update, id })
    .then((data) => res.json(data));
}

export async function uploadImagePublic(req, res) {
  const {
    value: { filetype: type, value, filename },
    folder,
  } = req.body;
  if (folder !== "pedidos")
    throw new HTTP400Error("No tienes permisos para realizar esta acción");
  const data = Buffer.from(value, "base64");
  const imageBuffer = {
    type,
    data,
  };
  return service
    .uploadImage({ imageBuffer, folder, filename, update: false, id: null })
    .then((data) => res.json(data));
}
