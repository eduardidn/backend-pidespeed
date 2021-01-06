import {
  Admin,
  Empresa,
  EmpresaDelivery,
  Usuario,
  UsuarioEmpresa,
} from "@models";
import { HTTP400Error, PasswordHelper, TokenUtils } from "@utils";

/**
 * LOGINS
 */
export async function loginUser({ password, user }) {
  const usuario = await Usuario.findOne({
    $or: [{ username: user }, { email: user }],
  })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  if (!usuario) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const { password: savedPassword } = usuario;
  const match = await PasswordHelper.matchPassword({ password, savedPassword });
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const token = await TokenUtils.createUserToken({ usuarioId: usuario._id });
  return { message: "ok", token, user: usuario };
}

export async function loginEmpresa({ password, user }) {
  const usuario = await UsuarioEmpresa.findOne({
    $or: [{ username: user }, { email: user }],
    type: "empresa",
  })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  if (!usuario) throw new HTTP400Error("Usuario o contraseña incorrectos");
  const { password: savedPassword } = usuario;
  const match = await PasswordHelper.compare({ password, hash: savedPassword });
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");
  const empresa = await Empresa.findOne({ _id: usuario.empresa })
    .populate("categoria")
    .populate("logo")
    .populate("img")
    .populate("ciudad")
    .populate("estado");
  const token = await TokenUtils.createUserToken({
    usuarioId: usuario._id,
    empresa: true,
    delivery: false,
  });
  const tokenEmpresa = await TokenUtils.createBusinessToken({
    id: usuario._id,
  });
  return {
    message: "ok",
    token,
    tokenAdmin: tokenEmpresa,
    user: usuario,
    empresa,
  };
}

export async function loginEmpresaDelivery({ password, user }) {
  const usuario = await UsuarioEmpresa.findOne({
    $or: [{ username: user }, { email: user }],
    type: "delivery",
  })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  if (!usuario) throw new HTTP400Error("Usuario o contraseña incorrectos");
  const { password: savedPassword } = usuario;
  const match = await PasswordHelper.compare({ password, hash: savedPassword });
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");
  const empresa = await EmpresaDelivery.findOne({
    _id: usuario.empresaDelivery,
  })
    .populate("logo")
    .populate("ciudad")
    .populate("estado");
  const token = await TokenUtils.createUserToken({
    usuarioId: usuario._id,
    empresa: true,
    delivery: true,
  });
  const tokenEmpresa = await TokenUtils.createBusinessToken({
    id: usuario._id,
  });
  return {
    message: "ok",
    token,
    tokenAdmin: tokenEmpresa,
    user: usuario,
    empresa,
  };
}

export async function loginAdmin({ password, user }) {
  const admin = await Admin.findOne({
    $or: [{ username: user }, { email: user }],
  })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  if (!admin) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const { password: savedPassword } = admin;
  // const match = await PasswordHelper.matchPassword({ password, savedPassword });
  const match = await PasswordHelper.compare({ password, hash: savedPassword });
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const token = await TokenUtils.createUserToken({
    usuarioId: admin._id,
    admin: true,
  });
  const tokenAdmin = await TokenUtils.createAdminToken({ id: admin._id });
  return { message: "ok", token, tokenAdmin, user: admin };
}

/**
 * UPDATE PASSWORD
 */

export async function listEmpresaByField({ field, value }) {
  return Empresa.findOne({ [field]: value })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function updatePasswordUser({ email, password }) {
  const hashPassword = await PasswordHelper.encryptPassword(password);
  return Usuario.findOneAndUpdate(
    { email },
    { password: hashPassword },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updatePasswordEmpresa({ field, value, password }) {
  const hashPassword = await PasswordHelper.hash(password);
  return UsuarioEmpresa.findOneAndUpdate(
    { [field]: value, type: "empresa" },
    { password: hashPassword },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updatePasswordEmpresaDelivery({
  field,
  value,
  password,
}) {
  const hashPassword = await PasswordHelper.hash(password);
  return UsuarioEmpresa.findOneAndUpdate(
    { [field]: value, type: "delivery" },
    { password: hashPassword },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updatePasswordAdmin({ adminId, password }) {
  const hashPassword = await PasswordHelper.hash(password);
  return Admin.findOneAndUpdate(
    { _id: adminId },
    { password: hashPassword },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

/**
 * BUSQUEDA DE USUARIOS
 */

export async function listUserByField({ field, value }) {
  return Usuario.findOne({ [field]: value })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addUser(value) {
  const { password } = value;
  value.password = await PasswordHelper.encryptPassword(password);
  return Usuario.create(value);
}

export async function updateUser({ value, usuarioId }) {
  return Usuario.findOneAndUpdate(
    { _id: usuarioId },
    { value },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}
