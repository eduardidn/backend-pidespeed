import forge from "node-forge";

/**
 * The functions below use a static vector and key is based on user id
 */
const vector = "QAZXSWEDCVFRTGBNHYUJMKIOLP";

export function crypt(id, str) {
  id = String(id);
  str = String(str);
  const key = hash(id);
  const encoded = encryptText(key, str);
  return forge.util.encode64(`${key}$${encoded}`);
}

export function decrypt(str) {
  str = String(str);
  str = forge.util.decode64(str);
  if (!str.includes("$")) return false;

  const key = str.split("$")[0];
  const encoded = str.split("$")[1];
  return decryptText(key, encoded);
}

export function encryptText(key, str) {
  try {
    const cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({ iv: vector });
    cipher.update(forge.util.createBuffer(str));
    cipher.finish();
    return forge.util.encode64(cipher.output.data);
  } catch (error) {
    return false;
  }
}

export function decryptText(key, encoded) {
  try {
    const decoded = forge.util.decode64(encoded);
    const decipher = forge.cipher.createDecipher("AES-CBC", key);
    decipher.start({ iv: vector });
    decipher.update(forge.util.createBuffer(decoded));
    decipher.finish();
    return decipher.output.data;
  } catch (error) {
    return false;
  }
}

export function hash(id) {
  id = String(id);
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += id.charAt(Math.floor(Math.random() * id.length));
  }
  return result;
}
