import { Bebida } from "@models";
import { Socket } from "@utils";

export async function list({ tipo, empresaId }) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Bebida.find(query).lean();
}

export async function listByIds({ tipo, ids }) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Bebida.find(query).lean();
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
