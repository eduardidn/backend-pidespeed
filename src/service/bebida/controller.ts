import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  const { tipo, empresaId } = Validator.validate(req.params, "tipo empresaId");
  return service.list({ tipo, empresaId }).then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { tipo, ids } = Validator.validate(req.params, "tipo ids");
  return service.listByIds({ tipo, ids }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { bebidaId } = req.params;
  return service.listOne({ bebidaId }).then((data) => res.json(data));
}

export async function addBebida(req, res) {
  const { nombre, cantidad, publish, empresa, tipoBebida } = Validator.validate(
    req.body,
    "nombre cantidad publish empresa tipoBebida",
  );
  return service
    .addBebida({ nombre, cantidad, publish, empresa, tipoBebida })
    .then((data) => res.json(data));
}

export async function updateBebida(req, res) {
  const { bebidaId } = req.params;
  const value = req.body;
  return service
    .updateBebida({ bebidaId, value })
    .then((data) => res.json(data));
}

export async function deleteBebida(req, res) {
  const { bebidaId } = req.params;
  return service.deleteBebida(bebidaId).then((data) => res.json(data));
}
