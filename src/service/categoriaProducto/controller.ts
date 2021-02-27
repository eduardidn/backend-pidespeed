import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { tipo } = Validator.validate(req.params, "tipo");
  return service.list(tipo).then((data) => res.json(data));
}

export async function listByRuta(req, res) {
  const { tipo, rutaCategoria } = Validator.validate(
    req.params,
    "tipo rutaCategoria",
  );
  return service
    .listByRuta({ tipo, rutaCategoria })
    .then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { categoriaProductoId } = req.params;
  return service
    .listOne({ categoriaProductoId })
    .then((data) => res.json(data));
}

export async function addCategoriaProducto(req, res) {
  const { nombre, publish, categoria } = Validator.validate(
    req.body,
    "nombre publish categoria",
  );
  return service
    .addCategoriaProducto({ nombre, publish, categoria })
    .then((data) => res.json(data));
}

export async function updateCategoriaProducto(req, res) {
  const { categoriaProductoId } = req.params;
  const value = req.body;
  return service
    .updateCategoriaProducto({ categoriaProductoId, value })
    .then((data) => res.json(data));
}

export async function deleteCategoriaProducto(req, res) {
  const { categoriaProductoId } = req.params;
  return service
    .deleteCategoriaProducto(categoriaProductoId)
    .then((data) => res.json(data));
}
