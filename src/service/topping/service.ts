import { Topping } from "../../utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo) query = { ...query, publish: tipo };
  return Topping.find(query)
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

export async function listByIds(tipo, ids) {
  tipo = Number(tipo) === 1 ? true : false;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo) query = { ...query, publish: tipo };
  return Topping.find(query)
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

export async function listOne({ toppingId }) {
  return Topping.findOne({ _id: toppingId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addTopping(value) {
  return Topping.create(value);
}

export async function updateTopping({ toppingId, value }) {
  return Topping.findOneAndUpdate({ _id: toppingId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function updateByIds({ value, ids }) {
  ids = ids.split(",");
  return Topping.updateMany({ _id: { $in: ids } }, value, {
    new: true,
  });
}

export async function deleteTopping(toppingId) {
  return Topping.findOneAndDelete({ _id: toppingId });
}
