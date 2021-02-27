import { Cuenta } from "../../utils";

export async function list() {
  return Cuenta.find({})
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

export async function listOne({ cuentaId }) {
  return Cuenta.findOne({ _id: cuentaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addCuenta(value) {
  return Cuenta.create(value);
}

export async function updateCuenta({ cuentaId, value }) {
  return Cuenta.findOneAndUpdate({ _id: cuentaId }, value, {
    new: true,

  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteCuenta(cuentaId) {
  return Cuenta.findOneAndDelete({ _id: cuentaId });
}
