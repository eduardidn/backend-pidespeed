import { Categoria, CategoriaProducto, Empresa } from "../../utils";

export async function list(tipo) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any;
  if (tipo) query = { ...query, publish: tipo };
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

export async function listByRuta({ tipo, rutaCategoria }) {
  const { _id: categoria } = await Categoria.findOne({
    ruta: rutaCategoria,
  }).lean();
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = {
    categoria,
  };
  if (tipo) query = { ...query, publish: tipo };
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
