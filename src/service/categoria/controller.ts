import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { tipo } = Validator.validate(req.params, "tipo");
  return service.list(tipo).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { categoriaId } = req.params;
  return service.listOne({ categoriaId }).then((data) => res.json(data));
}

export async function addCategoria(req, res) {
  const { nombre, publish, categoria } = Validator.validate(
    req.body,
    "nombre publish categoria",
  );
  return service
    .addCategoria({ nombre, publish, categoria })
    .then((data) => res.json(data));
}

export async function updateCategoria(req, res) {
  const { categoriaId } = req.params;
  const value = req.body;
  return service
    .updateCategoria({ categoriaId, value })
    .then((data) => res.json(data));
}

export async function deleteCategoria(req, res) {
  const { categoriaId } = req.params;
  return service.deleteCategoria(categoriaId).then((data) => res.json(data));
}
