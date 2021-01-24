import empresaDelivery from "@/utils/models/EmpresaDelivery";
import { Usuario, CompanyPartner } from "@models";
import { HTTP400Error, UploadImage, Socket } from "@utils";
import { uploadImage } from "../file/service";

export function listPartners({ empresaId }) {
  return CompanyPartner.find({
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

export async function listPartner({ partnerId }) {
  return CompanyPartner.findOne({ _id: partnerId })
    .populate("img")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addPartner(data) {
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
  return CompanyPartner.create(data);
}

export async function updatePartner({ partnerId, value }) {
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
  return CompanyPartner.findOneAndUpdate({ _id: partnerId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deletePartner(partnerId) {
  const companyPartner: any = await CompanyPartner.findOneAndDelete({
    _id: partnerId,
  });
  if (companyPartner.file) await UploadImage.deleteImage(companyPartner.img);
  companyPartner.delete();
  return companyPartner;
}
