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
  const { siropeId } = req.params;
  return service.listOne({ siropeId }).then((data) => res.json(data));
}

export async function addSirope(req, res) {
  /* const { nombre, precio, cantidad, publish, empresa } = Validator.validate(
    req.body,
    "nombre precio cantidad publish empresa",
  ); */
  return service.addSirope(req.body).then((data) => res.json(data));
}

export async function updateSirope(req, res) {
  const { siropeId } = req.params;
  const value = req.body;
  return service
    .updateSirope({ siropeId, value })
    .then((data) => res.json(data));
}

export async function updateByIds(req, res) {
  const { ids } = req.params;
  const value = req.body;
  return service.updateByIds({ ids, value }).then((data) => res.json(data));
}

export async function deleteSirope(req, res) {
  const { siropeId } = req.params;
  return service.deleteSirope(siropeId).then((data) => res.json(data));
}
