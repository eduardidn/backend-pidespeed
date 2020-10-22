import { Validator } from "@utils";
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
  const { saborId } = req.params;
  return service.listOne({ saborId }).then((data) => res.json(data));
}

export async function addSabor(req, res) {
  /* const { nombre, precio, cantidad, publish, empresa } = Validator.validate(
    req.body,
    "nombre precio cantidad publish empresa",
  ); */
  return service.addSabor(req.body).then((data) => res.json(data));
}

export async function updateSabor(req, res) {
  const { saborId } = req.params;
  const value = req.body;
  return service.updateSabor({ saborId, value }).then((data) => res.json(data));
}

export async function updateByIds(req, res) {
  const { ids } = req.params;
  const value = req.body;
  return service.updateByIds({ ids, value }).then((data) => res.json(data));
}

export async function deleteSabor(req, res) {
  const { saborId } = req.params;
  return service.deleteSabor(saborId).then((data) => res.json(data));
}
