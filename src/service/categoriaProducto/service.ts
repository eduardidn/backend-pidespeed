import { CategoriaProducto } from "@models";
import { Socket } from "@utils";

export async function list(tipo) {
  tipo = tipo === 1 ? 1 : 0;
  return CategoriaProducto.find({ publish: tipo }).lean();
}

export async function listOne({ categoriaProductoId }) {
  return CategoriaProducto.findOne({ _id: categoriaProductoId }).lean();
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
  );
}

export async function deleteCategoriaProducto(categoriaProductoId) {
  return CategoriaProducto.findOneAndDelete({ _id: categoriaProductoId });
}
