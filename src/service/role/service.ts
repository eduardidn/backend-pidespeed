import { Role } from "../../utils";

export async function list({ empresaId }) {
  return Role.find({ empresa: empresaId })
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

export async function listAll() {
  return Role.find({})
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

export async function listOne({ roleId }) {
  return Role.findOne({ _id: roleId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addRole(value) {
  return Role.create(value);
}

export async function updateRole({ roleId, value }) {
  return Role.findOneAndUpdate({ _id: roleId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteRole(roleId) {
  return Role.findOneAndDelete({ _id: roleId });
}
