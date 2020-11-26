import { Usuario } from "@models";
import { PasswordHelper, Socket } from "@utils";

export async function list() {
  return Usuario.find({})
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listOne({ usuarioId }) {
  return Usuario.findOne({ _id: usuarioId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function updateUsuario({ usuarioId, value }) {
  return Usuario.findOneAndUpdate({ _id: usuarioId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updateUsuarioPublic({ email, value }) {
  return Usuario.findOneAndUpdate({ email }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updatePassword({ usuarioId, password }) {
  const hashPassword = await PasswordHelper.encryptPassword(password);
  return Usuario.findOneAndUpdate(
    { _id: usuarioId },
    { password: hashPassword },
    { new: true, lean: true },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteUsuario(usuarioId) {
  return Usuario.findOneAndDelete({ _id: usuarioId });
}
