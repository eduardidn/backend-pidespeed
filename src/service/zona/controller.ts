import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { ciudadId } = req.params;
  return service.list({ ciudadId }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { ids } = req.params;
  return service.listByIds({ ids }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { zonaId } = req.params;
  return service.listOne({ zonaId }).then((data) => res.json(data));
}

export async function addZona(req, res) {
  const { nombre } = Validator.validate(req.body, "nombre");
  return service.addZona({ nombre }).then((data) => res.json(data));
}

export async function updateZona(req, res) {
  const { zonaId } = req.params;
  const value = req.body;
  return service.updateZona({ zonaId, value }).then((data) => res.json(data));
}

export async function deleteZona(req, res) {
  const { zonaId } = req.params;
  return service.deleteZona(zonaId).then((data) => res.json(data));
}
