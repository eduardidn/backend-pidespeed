import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { tipo, ruta } = Validator.validate(req.params, "tipo ruta");
  return service.list({ tipo, ruta }).then((data) => res.json(data));
}

export async function listCatEsp(req, res) {
  const { tipo, ruta } = Validator.validate(req.params, "tipo ruta");
  return service.listCatEsp({ tipo, ruta }).then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { tipo, ids } = Validator.validate(req.params, "tipo ids");
  return service.listByIds({ tipo, ids }).then((data) => res.json(data));
}

export async function listOneByDatos(req, res) {
  const { nombre, descripcion } = Validator.validate(
    req.params,
    "nombre descripcion",
  );
  return service
    .listOneByDatos({ nombre, descripcion })
    .then((data) => res.json(data));
}

export async function restarCantidad(req, res) {
  const { productoId, cantidad } = Validator.validate(
    req.params,
    "productoId cantidad",
  );
  return service
    .restarCantidad({ productoId, cantidad })
    .then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { productoId } = req.params;
  return service.listOne({ productoId }).then((data) => res.json(data));
}

export async function addProducto(req, res) {
  return service.addProducto(req.body).then((data) => res.json(data));
}

export async function updateProducto(req, res) {
  const { productoId } = req.params;
  const value = req.body;
  return service
    .updateProducto({ productoId, value })
    .then((data) => res.json(data));
}

export async function deleteProducto(req, res) {
  const { productoId } = req.params;
  return service.deleteProducto(productoId).then((data) => res.json(data));
}
