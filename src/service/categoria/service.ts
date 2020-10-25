import { Categoria } from "@models";
import { Socket } from "@utils";

export async function list(tipo) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any;
  if (tipo === 1) query = { ...query, publish: tipo };
  return Categoria.find(query)
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

export async function listOne({ categoriaId }) {
  return Categoria.findOne({ _id: categoriaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addCategoria(value) {
  return Categoria.create(value);
}

export async function updateCategoria({ categoriaId, value }) {
  return Categoria.findOneAndUpdate({ _id: categoriaId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteCategoria(categoriaId) {
  return Categoria.findOneAndDelete({ _id: categoriaId });
}
