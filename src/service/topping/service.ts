import { Topping } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Topping.find(query).lean();
}

export async function listByIds(tipo, ids) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Topping.find(query).lean();
}

export async function listOne({ toppingId }) {
  return Topping.findOne({ _id: toppingId }).lean();
}

export async function addTopping(value) {
  return Topping.create(value);
}

export async function updateTopping({ toppingId, value }) {
  return Topping.findOneAndUpdate({ _id: toppingId }, value, {
    new: true,
    lean: true,
  });
}

export async function updateByIds({ value, ids }) {
  ids = ids.split(",");
  return Topping.updateMany({ _id: { $in: ids } }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteTopping(toppingId) {
  return Topping.findOneAndDelete({ _id: toppingId });
}
