import { Bebida } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = tipo === 1 ? 1 : 0;
  return Bebida.find({ publish: tipo, empresa: empresaId }).lean();
}

export async function listByIds(tipo, ids) {
  tipo = tipo === 1 ? 1 : 0;
  ids = ids.split(",");
  return Bebida.find({ _id: { $in: ids }, publish: tipo }).lean();
}

export async function listOne({ bebidaId }) {
  return Bebida.findOne({ _id: bebidaId }).lean();
}

export async function addBebida(value) {
  return Bebida.create(value);
}

export async function updateBebida({ bebidaId, value }) {
  return Bebida.findOneAndUpdate({ _id: bebidaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteBebida(bebidaId) {
  return Bebida.findOneAndDelete({ _id: bebidaId });
}
