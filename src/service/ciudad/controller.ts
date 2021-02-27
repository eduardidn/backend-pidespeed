import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { ciudadId } = req.params;
  return service.listOne({ ciudadId }).then((data) => res.json(data));
}

export async function addCiudad(req, res) {
  const { nombre, estado } = Validator.validate(req.body, "nombre estado");
  return service.addCiudad({ nombre, estado }).then((data) => res.json(data));
}

export async function updateCiudad(req, res) {
  const { ciudadId } = req.params;
  const value = req.body;
  return service
    .updateCiudad({ ciudadId, value })
    .then((data) => res.json(data));
}

export async function deleteCiudad(req, res) {
  const { ciudadId } = req.params;
  return service.deleteCiudad(ciudadId).then((data) => res.json(data));
}
