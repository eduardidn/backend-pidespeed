import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  const { ids, tipo } = req.params;
  return service.list({ ids, tipo }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listByEmpresa(req, res) {
  const { empresaId } = req.params;
  return service.listByEmpresa({ empresaId }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { tamanoId } = req.params;
  return service.listOne({ tamanoId }).then((data) => res.json(data));
}

export async function addTamano(req, res) {
  return service.addTamano(req.body).then((data) => res.json(data));
}

export async function updateTamano(req, res) {
  const { tamanoId } = req.params;
  const value = req.body;
  return service
    .updateTamano({ tamanoId, value })
    .then((data) => res.json(data));
}

export async function deleteTamano(req, res) {
  const { tamanoId } = req.params;
  return service.deleteTamano(tamanoId).then((data) => res.json(data));
}
