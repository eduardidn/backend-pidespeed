import crypto from "crypto";
import bcrypt from "bcryptjs";

const hashSize = 2 << 5;
const hashIterations = 100;
const hashDigest = "sha512";

async function hash(password) {
  return new Promise(async (resolve, reject) => {
    try {
      const [buffer, salt] = await Promise.all([
        Buffer.alloc(hashSize * 2),
        crypto.randomBytes(hashSize),
      ]);
      salt.copy(buffer);

      const callback = (error, key) => {
        if (error) return reject(error);
        key.copy(buffer, salt.length);
        resolve(buffer.toString("base64"));
      };

      crypto.pbkdf2(
        password,
        salt,
        hashIterations,
        hashSize,
        hashDigest,
        callback,
      );
    } catch (error) {
      reject(error);
    }
  });
}

async function compare({ password, hash }) {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = Buffer.from(hash, "base64");

      const salt = buffer.slice(0, hashSize);
      const hashFromBuffer = buffer.slice(hashSize, hashSize * 2);

      const callback = (error, key) => {
        if (error) return reject(error);
        resolve(hashFromBuffer.compare(key) === 0);
      };
      crypto.pbkdf2(
        password,
        salt,
        hashIterations,
        hashSize,
        hashDigest,
        callback,
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * FUNCIONES DE PASSWORD PARA USUARIOS
 */

async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function matchPassword({ password, savedPassword }) {
  return bcrypt.compare(password, savedPassword);
}

export default {
  hash,
  compare,
  encryptPassword,
  matchPassword,
};
