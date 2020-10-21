import { Adicional } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = tipo === 1 ? 1 : 0;
  return Adicional.find({ publish: tipo, empresa: empresaId }).lean();
}

export async function listByIds(tipo, ids) {
  tipo = tipo === 1 ? 1 : 0;
  ids = ids.split(",");
  return Adicional.find({ _id: { $in: ids }, publish: tipo }).lean();
}

export async function listOne({ adicionalId }) {
  return Adicional.findOne({ _id: adicionalId }).lean();
}

export async function addAdicional(value) {
  return Adicional.create(value);
}

export async function updateAdicional({ adicionalId, value }) {
  return Adicional.findOneAndUpdate({ _id: adicionalId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteAdicional(adicionalId) {
  return Adicional.findOneAndDelete({ _id: adicionalId });
}
