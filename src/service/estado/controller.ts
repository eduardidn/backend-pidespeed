import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { estadoId } = req.params;
  return service.listOne({ estadoId }).then((data) => res.json(data));
}

export async function addEstado(req, res) {
  // const { nombre } = Validator.validate(req.body, "nombre");
  return service.addEstado(req.body).then((data) => res.json(data));
}

export async function updateEstado(req, res) {
  const { estadoId } = req.params;
  const value = req.body;
  return service
    .updateEstado({ estadoId, value })
    .then((data) => res.json(data));
}

export async function deleteEstado(req, res) {
  const { estadoId } = req.params;
  return service.deleteEstado(estadoId).then((data) => res.json(data));
}
