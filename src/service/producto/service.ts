import { Empresa, Producto } from "@models";
import { Socket } from "@utils";

export async function list({ tipo, ruta }) {
  const { _id: empresa } = await Empresa.findOne({ ruta }).lean();
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Producto.find(query).populate("file", "url").lean();
}

export async function listCatEsp({ tipo, ruta }) {
  const { _id: empresa } = await Empresa.findOne({ ruta }).lean();
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = {
    empresa,
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  let categorias = await Producto.find(query)
    .populate("categoria_product", "nombre")
    .sort({ categoria_product: 1 })
    .lean();
  categorias = [...new Set(categorias)];
  return categorias;
}

export async function listByIds({ tipo, ids }) {
  tipo = Number(tipo) === 1 ? 1 : 0;
  ids = ids.split(",");
  let query: any = {
    _id: { $in: ids },
  };
  if (tipo === 1) query = { ...query, publish: tipo };
  return Producto.find(query).lean();
}

export async function listOneByDatos({ nombre, descripcion }) {
  return Producto.findOne({ nombre, descripcion })
    .populate("file", "url")
    .lean();
}

export async function restarCantidad({ productoId, cantidad }) {
  const producto = await Producto.findOne({ _id: productoId })
    .select("cantidad")
    .exec();
  producto.cantidad = producto.cantidad - Number(cantidad);
  producto.save();
}

export async function listOne({ productoId }) {
  return Producto.findOne({ _id: productoId }).populate("file", "url").lean();
}

export async function addProducto(value) {
  return Producto.create(value);
}

export async function updateProducto({ productoId, value }) {
  return Producto.findOneAndUpdate({ _id: productoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteProducto(productoId) {
  return Producto.findOneAndDelete({ _id: productoId });
}
