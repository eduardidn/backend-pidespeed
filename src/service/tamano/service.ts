import { Tamano } from "@models";
import { Socket } from "@utils";

export async function list({ ids, tipo }) {
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Tamano.find(query).lean();
}

export function listAll() {
  return Tamano.find({}).lean();
}

export function listByEmpresa({ empresaId }) {
  return Tamano.find({ empresa: empresaId }).lean();
}

export async function listOne({ tamanoId }) {
  return Tamano.findOne({ _id: tamanoId }).lean();
}

export async function addTamano(value) {
  return Tamano.create(value);
}

export async function updateTamano({ tamanoId, value }) {
  return Tamano.findOneAndUpdate({ _id: tamanoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteTamano(tamanoId) {
  return Tamano.findOneAndDelete({ _id: tamanoId });
}
