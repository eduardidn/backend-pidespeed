import { Pago } from "@models";
import { Socket } from "@utils";

export async function list({ empresaId }) {
  return Pago.find({ empresa: empresaId }).lean();
}

export async function listAll() {
  return Pago.find({}).lean();
}

export async function listOne({ pagoId }) {
  return Pago.findOne({ _id: pagoId }).lean();
}

export async function addPago(value) {
  return Pago.create(value);
}

export async function updatePago({ pagoId, value }) {
  return Pago.findOneAndUpdate({ _id: pagoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deletePago(pagoId) {
  return Pago.findOneAndDelete({ _id: pagoId });
}
