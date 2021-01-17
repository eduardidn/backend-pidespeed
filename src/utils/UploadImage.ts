import * as GoogleStorage from "./GoogleStorage";
import { File } from "@models";
import crypto from "crypto";

import fs from "fs";

const BUCKETNAME = "pidespeed-storage";

export async function uploadBase64({
  imageBuffer,
  filename,
  folder,
  update,
  id,
}) {
  const fileName = `${crypto.randomBytes(10).toString("hex")}-${filename}`;
  const filePath = `tmp/${fileName}`;
  const imagesPath = `${folder}/${fileName}`;
  if (!fs.existsSync("./tmp/")) fs.mkdirSync("./tmp", 0o766);
  await fs.writeFileSync(filePath, imageBuffer.data);

  await GoogleStorage.uploadFileFromPath(BUCKETNAME, filePath);
  await GoogleStorage.move(BUCKETNAME, fileName, imagesPath);
  await GoogleStorage.makePublic(BUCKETNAME, imagesPath);

  fs.unlink(filePath, () => ({}));

  if (update) {
    const file: any = await getImage({ id });
    await GoogleStorage.deleteFile(BUCKETNAME, file.url);
    return updateImage({ id, url: imagesPath, type: folder });
  }
  return saveImage({
    url: imagesPath,
    type: folder,
  });
}

export async function uploadTest(fileName) {
  const filePath = `../server/build/img/empresas/${fileName}`;
  const imagesPath = `empresas/${fileName}`;

  await GoogleStorage.uploadFileFromPath(BUCKETNAME, filePath);
  await GoogleStorage.move(BUCKETNAME, fileName, imagesPath);
  await GoogleStorage.makePublic(BUCKETNAME, imagesPath);
  return "ok";
}

export async function listFiles() {
  await GoogleStorage.listFiles(BUCKETNAME);
}

async function saveImage({ url, type }) {
  if (!url) throw new Error("Url is not defined");
  return File.create({ url, type });
}

async function getImage({ id }) {
  return File.findOne({ _id: id }).exec();
}

async function updateImage({ id, url, type }) {
  if (!url) throw new Error("Url is not defined");
  return File.findOneAndUpdate({ _id: id }, { url, type }, { new: true });
}

export async function deleteImage(id) {
  const file: any = await File.findOneAndDelete({ _id: id });
  return GoogleStorage.deleteFile(BUCKETNAME, file.url);
}

export function getImgData(data) {
  const value = data.image.split(",")[1];
  const type = data.image.split(",")[0].split(";")[0].split("/")[1];
  const filename = `${data.Afiliado}-${data.empresa}`;
  const image = Buffer.from(value, "base64");
  const imageBuffer = {
    type,
    image,
  };
  return { imageBuffer, filename };
}
