import crypto from "crypto";
import forge from "node-forge";

import * as Crypt from "./Crypt";

// These functions use dynamic vector and key (or manual key [Eg: key = userId]) to encrypt data using aes-cbc
const algorithm = "aes-256-cbc";
const aesHashSize = 2 << 4;

function _encryptData(str = "", key) {
  const hasKey = key !== undefined;
  key = hasKey
    ? hash(String(key), aesHashSize)
    : crypto.randomBytes(4 << 3).toString("hex");
  return hasKey ? Crypt.encryptText(key, str) : Crypt.crypt(key, str);
}

export function encrypt(str, manualKey) {
  try {
    if (str) {
      const data = JSON.stringify(str);
      const key = crypto.randomBytes(4 << 3);
      const iv = crypto.randomBytes(2 << 3);
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      const encryptedData = Buffer.concat([
        cipher.update(data),
        cipher.final(),
      ]);
      const dataObject = {
        i: iv.toString("hex"),
        v: key.toString("hex"),
        b: encryptedData.toString("hex"),
      };
      return _encryptData(
        forge.util.encode64(JSON.stringify(dataObject)),
        manualKey,
      );
    }
    return false;
  } catch (error) {
    return false;
  }
}

function _decryptData(str = "", key) {
  return key !== undefined
    ? Crypt.decryptText(hash(String(key), aesHashSize), str)
    : Crypt.decrypt(str);
}

export function decrypt(encodedData, manualKey) {
  try {
    if (encodedData) {
      const dataObject = JSON.parse(
        forge.util.decode64(_decryptData(encodedData, manualKey)),
      );
      const iv = Buffer.from(dataObject.i, "hex");
      const key = Buffer.from(dataObject.v, "hex");
      const data = Buffer.from(dataObject.b, "hex");
      const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      const decryptedData = Buffer.concat([
        decipher.update(data),
        decipher.final(),
      ]);
      return JSON.parse(decryptedData.toString());
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function hash(str, size = 32) {
  if (str.length > size) {
    str = str.substr(0, size);
  } else if (str.length < size) {
    while (str.length < size) str += str.substr(0, size - str.length);
  }
  return str;
}
