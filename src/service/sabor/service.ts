import { Sabor } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Sabor.find(query).lean();
}

export async function listByIds(tipo, ids) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Sabor.find(query).lean();
}

export async function listOne({ saborId }) {
  return Sabor.findOne({ _id: saborId }).lean();
}

export async function addSabor(value) {
  return Sabor.create(value);
}

export async function updateSabor({ saborId, value }) {
  return Sabor.findOneAndUpdate({ _id: saborId }, value, {
    new: true,
    lean: true,
  });
}

export async function updateByIds({ value, ids }) {
  ids = ids.split(",");
  return Sabor.updateMany({ _id: { $in: ids } }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteSabor(saborId) {
  return Sabor.findOneAndDelete({ _id: saborId });
}
