import { Tamano } from "../../utils";

export async function list({ ids, tipo }) {
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo) query = { ...query, publish: tipo };
  return Tamano.find(query)
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

export function listAll() {
  return Tamano.find({})
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

export function listByEmpresa({ empresaId }) {
  return Tamano.find({ empresa: empresaId })
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

export async function listOne({ tamanoId }) {
  return Tamano.findOne({ _id: tamanoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addTamano(value) {
  return Tamano.create(value);
}

export async function updateTamano({ tamanoId, value }) {
  return Tamano.findOneAndUpdate({ _id: tamanoId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteTamano(tamanoId) {
  return Tamano.findOneAndDelete({ _id: tamanoId });
}
