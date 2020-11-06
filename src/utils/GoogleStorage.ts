import { Storage } from "@google-cloud/storage";
import logger from "./logger";
import path from "path";

export const googleJsonPath = path.resolve(
  __dirname,
  "../../../google-storage-service-account.json",
);

const configStorage = {
  projectId: "tensile-ethos-293713",
  keyFilename: googleJsonPath,
};

export const storage = new Storage(configStorage);

export function makePublic(bucketName, filename) {
  return storage.bucket(bucketName).file(filename).makePublic();
}

export function uploadFileFromPath(
  bucketName,
  file,
  metadata = {
    cacheControl: "public, max-age=31536000",
    contentType: file.mimetype,
  },
) {
  return storage.bucket(bucketName).upload(file, {
    gzip: true,
    metadata: {
      cacheControl: metadata.cacheControl || "public, max-age=31536000",
      contentType: metadata.contentType || file.mimetype,
    },
  });
}

export function move(bucketName, srcFilename, destFilename) {
  return storage.bucket(bucketName).file(srcFilename).move(destFilename);
}

export function deleteFile(bucketName, filename) {
  return storage.bucket(bucketName).file(filename).delete();
}

export async function listFiles(bucketName) {
  // Lists files in the bucket
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: "zonas/" });
  files.forEach(async (file) => {
    await makePublic(bucketName, file.name);
    // console.log(file.name);
  });
}
