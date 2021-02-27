import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { tipo, empresaId } = Validator.validate(req.params, "tipo empresaId");
  return service.list(tipo, empresaId).then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { tipo, ids } = Validator.validate(req.params, "tipo ids");
  return service.listByIds(tipo, ids).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { toppingId } = req.params;
  return service.listOne({ toppingId }).then((data) => res.json(data));
}

export async function addTopping(req, res) {
  /* const { nombre, precio, cantidad, publish, empresa } = Validator.validate(
    req.body,
    "nombre precio cantidad publish empresa",
  ); */
  return service.addTopping(req.body).then((data) => res.json(data));
}

export async function updateTopping(req, res) {
  const { toppingId } = req.params;
  const value = req.body;
  return service
    .updateTopping({ toppingId, value })
    .then((data) => res.json(data));
}

export async function updateByIds(req, res) {
  const { ids } = req.params;
  const value = req.body;
  return service.updateByIds({ ids, value }).then((data) => res.json(data));
}

export async function deleteTopping(req, res) {
  const { toppingId } = req.params;
  return service.deleteTopping(toppingId).then((data) => res.json(data));
}
