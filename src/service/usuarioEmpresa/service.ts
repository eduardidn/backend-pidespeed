import { UsuarioEmpresa } from "@models";
import { PasswordHelper, UploadImage, Socket } from "@utils";

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

export async function listUserCompanyByField({ field, value }) {
  return UsuarioEmpresa.findOne({ [field]: value })
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
    const { imageBuffer, filename } = UploadImage.getImgData(data);
    const { _id: imageId } = await UploadImage.uploadBase64({
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
    const { imageBuffer, filename } = UploadImage.getImgData(value);
    if (value.img === "5fa5b4bdb6dac50570af1a1b") {
      const { _id: imageId } = await UploadImage.uploadBase64({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: false,
        id: null,
      });
      value.img = imageId;
    } else {
      await UploadImage.uploadBase64({
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
  const userCompany = await UsuarioEmpresa.findOne({ _id: usuarioId });
  if (userCompany.img !== "5fa5b4bdb6dac50570af1a1b")
    await UploadImage.deleteImage(userCompany.img);
  userCompany.delete();
  return userCompany;
}
