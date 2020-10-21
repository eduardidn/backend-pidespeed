import { Cuenta } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Cuenta.find({}).lean();
}

export async function listOne({ cuentaId }) {
  return Cuenta.findOne({ _id: cuentaId }).lean();
}

export async function addCuenta(value) {
  return Cuenta.create(value);
}

export async function updateCuenta({ cuentaId, value }) {
  return Cuenta.findOneAndUpdate({ _id: cuentaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteCuenta(cuentaId) {
  return Cuenta.findOneAndDelete({ _id: cuentaId });
}
