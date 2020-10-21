import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { acompId } = req.params;
  return service.listOne({ acompId }).then((data) => res.json(data));
}

export async function addAcomp(req, res) {
  const { nombre } = Validator.validate(req.body, "nombre");
  return service.addAcomp({ nombre }).then((data) => res.json(data));
}

export async function updateAcomp(req, res) {
  const { acompId } = req.params;
  const value = req.body;
  return service.updateAcomp({ acompId, value }).then((data) => res.json(data));
}

export async function deleteAcomp(req, res) {
  const { acompId } = req.params;
  return service.deleteAcomp(acompId).then((data) => res.json(data));
}
