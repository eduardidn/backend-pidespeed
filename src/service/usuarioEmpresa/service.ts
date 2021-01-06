import empresaDelivery from "@/utils/models/EmpresaDelivery";
import { Usuario, UsuarioEmpresa, EmpresaDelivery, Empresa } from "@models";
import { PasswordHelper, Socket } from "@utils";
import { uploadImage } from "../file/service";

export function listUsuarios({ empresaId, type }) {
  return UsuarioEmpresa.find({
    $or: [{ empresa: empresaId }, { empresaDelivery: empresaId }],
    type,
  })
    .populate("img")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listUsuario({ usuarioId, type }) {
  return UsuarioEmpresa.findOne({ _id: usuarioId, type })
    .populate("img")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addUsuario(data) {
  const { password } = data;
  data.password = await PasswordHelper.hash(password);
  if (data.image) {
    const { imageBuffer, filename } = _getImgData(data);
    const { _id: imageId } = await uploadImage({
      imageBuffer,
      folder: "usuariosEmpresa",
      filename,
      update: false,
      id: null,
    });
    data.img = imageId;
  }
  if (data.type === "delivery") {
    data.empresaDelivery = data.empresa;
    delete data.empresa;
  }
  return UsuarioEmpresa.create(data);
}

export async function updateUsuario({ usuarioId, value }) {
  if (value.image) {
    const { imageBuffer, filename } = _getImgData(value);
    if (value.img === "5fa5b4bdb6dac50570af1a1b") {
      const { _id: imageId } = await uploadImage({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: false,
        id: null,
      });
      value.img = imageId;
    } else {
      await uploadImage({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: true,
        id: value.img,
      });
    }
  }
  return UsuarioEmpresa.findOneAndUpdate({ _id: usuarioId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteUsuario(usuarioId) {
  return Usuario.findOneAndDelete({ _id: usuarioId });
}

function _getImgData(data) {
  const value = data.image.split(",")[1];
  const type = data.image.split(",")[0].split(";")[0].split("/")[1];
  const filename = `${data.usuario}-${data.empresa}`;
  const image = Buffer.from(value, "base64");
  const imageBuffer = {
    type,
    image,
  };
  return { imageBuffer, filename };
}
