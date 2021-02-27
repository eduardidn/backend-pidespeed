import { Sabor } from "../../utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo) query = { ...query, publish: tipo };
  return Sabor.find(query)
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
  return Sabor.find(query)
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

export async function listOne({ saborId }) {
  return Sabor.findOne({ _id: saborId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addSabor(value) {
  return Sabor.create(value);
}

export async function updateSabor({ saborId, value }) {
  return Sabor.findOneAndUpdate({ _id: saborId }, value, {
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
  return Sabor.updateMany({ _id: { $in: ids } }, value, {
    new: true,

  });
}

export async function deleteSabor(saborId) {
  return Sabor.findOneAndDelete({ _id: saborId });
}
