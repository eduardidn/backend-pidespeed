import { Sirope } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Sirope.find(query).lean();
}

export async function listByIds(tipo, ids) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Sirope.find(query).lean();
}

export async function listOne({ siropeId }) {
  return Sirope.findOne({ _id: siropeId }).lean();
}

export async function addSirope(value) {
  return Sirope.create(value);
}

export async function updateSirope({ siropeId, value }) {
  return Sirope.findOneAndUpdate({ _id: siropeId }, value, {
    new: true,
    lean: true,
  });
}

export async function updateByIds({ value, ids }) {
  ids = ids.split(",");
  return Sirope.updateMany({ _id: { $in: ids } }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteSirope(siropeId) {
  return Sirope.findOneAndDelete({ _id: siropeId });
}