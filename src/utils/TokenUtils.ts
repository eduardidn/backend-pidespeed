import { sign, verify } from "jsonwebtoken";
import fs from "fs";
import path from "path";

import TokenCrypt from "./TokenCrypt";

const PKPath = path.resolve(__dirname, "../../jwt.pem");
const PK = fs.readFileSync(PKPath);

async function _createToken(key, content) {
  const encryptedContent = await TokenCrypt.crypt(
    String(key),
    JSON.stringify(content),
  );
  const token = sign(
    {
      token: encryptedContent,
    },
    PK,
    {
      expiresIn: "2d",
    },
  );
  return TokenCrypt.crypt(String(key), token);
}

async function createBussinesToken({ id }) {
  return _createToken(id, {
    id,
  });
}

async function createAdminToken({ id }) {
  return _createToken(id, {
    id,
  });
}

async function createUserToken({ user }) {
  const { _id: userId } = user;

  return _createToken(userId, {
    userId,
  });
}

async function validateToken({ token }) {
  token = token.split(" ")[0];
  const jwt = await TokenCrypt.decrypt(token);

  const invalid = (expired = false) => ({
    valid: false,
    expired,
    data: undefined,
  });
  const valid = (info: any) => ({ valid: true, expired: false, data: info });

  if (!jwt) return invalid(false);

  try {
    const jwtData = verify(jwt, PK, {});
    if (!jwtData.token) return invalid(false);
    const data = await TokenCrypt.decrypt(jwtData.token);
    const userData = JSON.parse(data);
    return valid(userData);
  } catch (error) {
    return invalid(false);
  }
}

async function needValidate(url) {
  const whitelist = [""];

  const whiteListEndsWidth = [""];

  for (const wlUrl of whiteListEndsWidth) if (url.endsWith(wlUrl)) return false;

  for (const wlUrl of whitelist) if (url.startsWith(wlUrl)) return false;

  return true;
}

export default {
  createUserToken,
  createBussinesToken,
  createAdminToken,
  needValidate,
  validateToken,
};
