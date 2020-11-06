import {} from "@models";
import { UploadImage } from "@utils";

export async function uploadImage({
  imageBuffer,
  folder,
  filename,
  update,
  id,
}) {
  const name = filename.split(";")[0];
  return UploadImage.uploadBase64({
    imageBuffer,
    folder,
    filename: name,
    update,
    id,
  });
}
