import empresaDelivery from "@/utils/models/EmpresaDelivery";
import { Usuario, AfiliadoDelivery } from "@models";
import { HTTP400Error, UploadImage, Socket } from "@utils";
import { uploadImage } from "../file/service";

export function listAfiliados({ empresaId }) {
  return AfiliadoDelivery.find({
    empresaDelivery: empresaId,
    public: { $ne: false },
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

export async function listAfiliado({ AfiliadoId }) {
  return AfiliadoDelivery.findOne({ _id: AfiliadoId })
    .populate("img")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addAfiliado(data) {
  if (!data.image) throw new HTTP400Error("Image is required");
  const { imageBuffer, filename } = UploadImage.getImgData(data);
  const { _id: imageId } = await uploadImage({
    imageBuffer,
    folder: "AfiliadosEmpresa",
    filename,
    update: false,
    id: null,
  });
  data.img = imageId;
  return AfiliadoDelivery.create(data);
}

export async function updateAfiliado({ AfiliadoId, value }) {
  if (value.image) {
    const { imageBuffer, filename } = UploadImage.getImgData(value);
    await uploadImage({
      imageBuffer,
      folder: "AfiliadosEmpresa",
      filename,
      update: true,
      id: value.img,
    });
  }
  return AfiliadoDelivery.findOneAndUpdate({ _id: AfiliadoId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteAfiliado(AfiliadoId) {
  return AfiliadoDelivery.findOneAndDelete({ _id: AfiliadoId });
}
