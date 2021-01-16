import { Sirope } from "@models";
import { Socket } from "@utils";

export async function list(tipo, empresaId) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = {
    empresa: empresaId,
  };
  if (tipo) query = { ...query, publish: tipo };
  return Sirope.find(query)
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
  return Sirope.find(query)
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

export async function listOne({ siropeId }) {
  return Sirope.findOne({ _id: siropeId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addSirope(value) {
  return Sirope.create(value);
}

export async function updateSirope({ siropeId, value }) {
  return Sirope.findOneAndUpdate({ _id: siropeId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
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
