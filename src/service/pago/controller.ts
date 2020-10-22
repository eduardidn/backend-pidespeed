import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  const { empresaId } = req.params;
  return service.list({ empresaId }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { pagoId } = req.params;
  return service.listOne({ pagoId }).then((data) => res.json(data));
}

export async function addPago(req, res) {
  // const { nombre } = Validator.validate(req.body, "nombre");
  return service.addPago(req.body).then((data) => res.json(data));
}

export async function updatePago(req, res) {
  const { pagoId } = req.params;
  const value = req.body;
  return service.updatePago({ pagoId, value }).then((data) => res.json(data));
}

export async function deletePago(req, res) {
  const { pagoId } = req.params;
  return service.deletePago(pagoId).then((data) => res.json(data));
}
