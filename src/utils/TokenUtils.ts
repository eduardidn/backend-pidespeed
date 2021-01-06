import { sign, verify } from "jsonwebtoken";
import fs from "fs";
import path from "path";

import TokenCrypt from "./TokenCrypt";

const PKPath = path.resolve(__dirname, "../../user.pem");
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

async function createBusinessToken({ id }) {
  return _createToken(id, {
    id,
  });
}

async function createAdminToken({ id }) {
  return _createToken(id, {
    id,
  });
}

async function createUserToken({
  usuarioId,
  admin,
  empresa,
  delivery,
}: {
  usuarioId;
  admin?;
  empresa?;
  delivery?;
}) {
  const data: any = { usuarioId };
  if (admin) data.admin = admin;
  if (empresa) data.empresa = empresa;
  if (delivery) data.delivery = delivery;
  return _createToken(usuarioId, data);
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
  const whitelist = [
    "/api/login",
    "/api/empresa/public",
    "/api/favorito",
    "api/usuario/password",
  ];

  const whiteListEndsWidth = ["/public"];

  for (const wlUrl of whiteListEndsWidth) if (url.endsWith(wlUrl)) return false;

  for (const wlUrl of whitelist) if (url.startsWith(wlUrl)) return false;

  return true;
}

export default {
  createUserToken,
  createBusinessToken,
  createAdminToken,
  needValidate,
  validateToken,
};
