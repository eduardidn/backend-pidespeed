import { UsuarioEmpresa } from "@models";
import { PasswordHelper, UploadImage, Socket, HTTP400Error } from "@utils";

const types = {
  car: "600f87f33ba83247a488ecae",
  motorcycle: "600f88333ba83247a488ecaf",
  bike: "600f88423ba83247a488ecb0",
};

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
    const { imageBuffer, filename } = UploadImage.getImgData(data.image);
    const { _id: imageId } = await UploadImage.uploadBase64({
      imageBuffer,
      filename,
      folder: "usuariosEmpresa",
      update: false,
      id: null,
    });
    data.img = imageId;
  }
  if (data.vehicle_image) {
    const { imageBuffer, filename } = UploadImage.getImgData(
      data.vehicle_image,
    );
    const { _id: imageId } = await UploadImage.uploadBase64({
      imageBuffer,
      folder: "usuariosEmpresa",
      filename,
      update: false,
      id: null,
    });
    data.img = imageId;
  } else data.vehicle_image = types[data.vehicle_type];
  if (data.type === "delivery") {
    data.empresaDelivery = data.empresa;
    delete data.empresa;
  }
  return UsuarioEmpresa.create(data);
}

export async function updateUsuario({ value }) {
  if (!value._id) throw new HTTP400Error("object need to have the _id");
  const userId = value._id;
  delete value._id;
  if (value.password) {
    const { password } = value;
    value.password = await PasswordHelper.hash(password);
  }
  if (value.image?.value) {
    const { imageBuffer, filename } = UploadImage.getImgData(value.image);
    if (value.image.id === "600f85ce3ba83247a488ecad") {
      const { _id: imageId } = await UploadImage.uploadBase64({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: false,
        id: null,
      });
      value.image = imageId;
    } else {
      await UploadImage.uploadBase64({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: true,
        id: value.image.id,
      });
      delete value.image;
    }
  }
  if (value.vehicle_image?.value) {
    const { imageBuffer, filename } = UploadImage.getImgData(
      value.vehicle_image,
    );
    if (
      [
        "600f87f33ba83247a488ecae",
        "600f88333ba83247a488ecaf",
        "600f88423ba83247a488ecb0",
      ].includes(value.vehicle_image.id)
    ) {
      const { _id: imageId } = await UploadImage.uploadBase64({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: false,
        id: null,
      });
      value.vehicle_image = imageId;
    } else {
      await UploadImage.uploadBase64({
        imageBuffer,
        folder: "usuariosEmpresa",
        filename,
        update: true,
        id: value.vehicle_image.id,
      });
      delete value.vehicle_image;
    }
  } else value.vehicle_image = types[value.vehicle_type];
  return UsuarioEmpresa.findOneAndUpdate({ _id: userId }, value, {
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
  const userCompany: any = await UsuarioEmpresa.findOne({ _id: usuarioId });
  if (userCompany.img !== "6018afec5ad8524648ca8216")
    await UploadImage.deleteImage(userCompany.img);
  if (
    ![
      "600f87f33ba83247a488ecae",
      "600f88333ba83247a488ecaf",
      "600f88423ba83247a488ecb0",
    ].includes(userCompany.vehicle_image)
  )
    await UploadImage.deleteImage(userCompany.vehicle_image);
  userCompany.delete();
  return userCompany;
}
