import { Admin, Empresa, Usuario, UsuarioEmpresa } from "@models";
import { HTTP400Error, PasswordHelper, TokenUtils } from "@utils";

/**
 * LOGINS
 */
export async function loginUser({ password, user }) {
  const usuario = await Usuario.findOne({
    $or: [{ username: user }, { email: user }],
  }).lean();
  if (!usuario) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const { password: savedPassword } = usuario;
  const match = await PasswordHelper.matchPassword({ password, savedPassword });
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const token = await TokenUtils.createUserToken({ usuarioId: usuario._id });
  return { message: "ok", token, user: usuario[0] };
}

export async function loginEmpresa({ password, user }) {
  const usuario = await UsuarioEmpresa.findOne({
    $or: [{ username: user }, { email: user }],
  }).lean();
  if (!usuario) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const { password: savedPassword } = usuario;
  const match = await PasswordHelper.matchPassword({ password, savedPassword });
  // let match = await PasswordHelper.compare({ password, hash: savedPassword })
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const token = await TokenUtils.createUserToken({ usuarioId: usuario._id });
  const tokenEmpresa = await TokenUtils.createBusinessToken({
    id: usuario._id,
  });
  return { message: "ok", token, tokenAdmin: tokenEmpresa, user: usuario[0] };
}

export async function loginAdmin({ password, user }) {
  const admin = await Admin.findOne({
    $or: [{ username: user }, { email: user }],
  }).lean();
  if (!admin) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const { password: savedPassword } = admin;
  const match = await PasswordHelper.matchPassword({ password, savedPassword });
  // let match = await PasswordHelper.compare({ password, hash: savedPassword })
  if (!match) throw new HTTP400Error("Usuario o contraseña incorrectos");

  const token = await TokenUtils.createUserToken({ usuarioId: admin._id });
  const tokenAdmin = await TokenUtils.createAdminToken({ id: admin._id });
  return { message: "ok", token, tokenAdmin, user: admin[0] };
}

/**
 * UPDATE PASSWORD
 */

export async function listEmpresaByField({ field, value }) {
  return Empresa.findOne({ [field]: value }).lean;
}

export async function updatePasswordUser({ email, password }) {
  const hashPassword = await PasswordHelper.encryptPassword(password);
  return Usuario.findOneAndUpdate(
    { email },
    { password: hashPassword },
    { new: true, lean: true },
  );
}

export async function updatePasswordEmpresa({ field, value, password }) {
  const hashPassword = await PasswordHelper.hash(password);
  return UsuarioEmpresa.findOneAndUpdate(
    { [field]: value },
    { password: hashPassword },
    { new: true, lean: true },
  );
}

export async function updatePasswordAdmin({ adminId, password }) {
  const hashPassword = await PasswordHelper.hash(password);
  return Admin.findOneAndUpdate(
    { _id: adminId },
    { password: hashPassword },
    { new: true, lean: true },
  );
}

/**
 * BUSQUEDA DE USUARIOS
 */

export async function listUserByField({ field, value }) {
  return Usuario.findOne({ [field]: value }).lean();
}

export async function addUser(value) {
  const { password } = value;
  value.password = await PasswordHelper.encryptPassword(password);
  return Usuario.create({ value });
}

export async function updateUser({ value, usuarioId }) {
  return Usuario.findOneAndUpdate(
    { _id: usuarioId },
    { value },
    { new: true, lean: true },
  );
}
