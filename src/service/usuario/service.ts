import { Usuario } from "@models";
import { PasswordHelper, Socket } from "@utils";

export async function list() {
  return Usuario.find({}).lean();
}

export async function listOne({ usuarioId }) {
  return Usuario.findOne({ _id: usuarioId }).lean();
}

export async function updateUsuario({ usuarioId, value }) {
  return Usuario.findOneAndUpdate({ _id: usuarioId }, value, {
    new: true,
    lean: true,
  });
}

export async function updatePassword({ usuarioId, password }) {
  const hashPassword = await PasswordHelper.encryptPassword(password);
  return Usuario.findOneAndUpdate(
    { _id: usuarioId },
    { password: hashPassword },
    { new: true, lean: true },
  );
}

export async function deleteUsuario(usuarioId) {
  return Usuario.findOneAndDelete({ _id: usuarioId });
}
