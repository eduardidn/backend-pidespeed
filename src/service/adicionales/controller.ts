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
  const { adicionalId } = req.params;
  return service.listOne({ adicionalId }).then((data) => res.json(data));
}

export async function addAdicional(req, res) {
  const { nombre, precio, cantidad, publish, empresa } = Validator.validate(
    req.body,
    "nombre precio cantidad publish empresa",
  );
  return service
    .addAdicional({ nombre, precio, cantidad, publish, empresa })
    .then((data) => res.json(data));
}

export async function updateAdicional(req, res) {
  const { adicionalId } = req.params;
  const value = req.body;
  return service
    .updateAdicional({ adicionalId, value })
    .then((data) => res.json(data));
}

export async function deleteAdicional(req, res) {
  const { adicionalId } = req.params;
  return service.deleteAdicional(adicionalId).then((data) => res.json(data));
}
