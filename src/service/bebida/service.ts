import { Bebida } from "../../utils";

export async function list({ tipo, empresaId }) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo) query = { ...query, publish: tipo };
  return Bebida.find(query)
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

export async function listByIds({ tipo, ids }) {
  tipo = Number(tipo) === 1 ? true : false;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo) query = { ...query, publish: tipo };
  return Bebida.find(query)
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

export async function listOne({ bebidaId }) {
  return Bebida.findOne({ _id: bebidaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addBebida(value) {
  return Bebida.create(value);
}

export async function updateBebida({ bebidaId, value }) {
  return Bebida.findOneAndUpdate({ _id: bebidaId }, value, {
    new: true,

  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteBebida(bebidaId) {
  return Bebida.findOneAndDelete({ _id: bebidaId });
}
