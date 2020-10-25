import { Adicional } from "@models";
import { Socket } from "@utils";

export async function list({ tipo, empresaId }) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Adicional.find(query)
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
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Adicional.find(query)
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

export async function listOne({ adicionalId }) {
  return Adicional.findOne({ _id: adicionalId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addAdicional(value) {
  return Adicional.create(value);
}

export async function updateAdicional({ adicionalId, value }) {
  return Adicional.findOneAndUpdate({ _id: adicionalId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteAdicional(adicionalId) {
  return Adicional.findOneAndDelete({ _id: adicionalId });
}
