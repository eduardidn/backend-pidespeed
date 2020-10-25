import { CategoriaProducto, Empresa } from "@models";
import { Socket } from "@utils";

export async function list(tipo) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any;
  if (tipo === 1) query = { ...query, publish: tipo };
  return CategoriaProducto.find(query)
    .populate("categoria", "icono")
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

export async function listByRuta({ tipo, ruta }) {
  const { _id: empresa } = await Empresa.findOne({ ruta }).lean();
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return CategoriaProducto.find(query)
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

export async function listOne({ categoriaProductoId }) {
  return CategoriaProducto.findOne({ _id: categoriaProductoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addCategoriaProducto(value) {
  return CategoriaProducto.create(value);
}

export async function updateCategoriaProducto({ categoriaProductoId, value }) {
  return CategoriaProducto.findOneAndUpdate(
    { _id: categoriaProductoId },
    value,
    {
      new: true,
      lean: true,
    },
  ).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteCategoriaProducto(categoriaProductoId) {
  return CategoriaProducto.findOneAndDelete({ _id: categoriaProductoId });
}
