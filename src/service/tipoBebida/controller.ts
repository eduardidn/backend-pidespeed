import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { tipoBebidaId } = req.params;
  return service.listOne({ tipoBebidaId }).then((data) => res.json(data));
}

export async function addTipoBebida(req, res) {
  // const { nombre } = Validator.validate(req.body, "nombre");
  return service.addTipoBebida(req.body).then((data) => res.json(data));
}

export async function updateTipoBebida(req, res) {
  const { tipoBebidaId } = req.params;
  const value = req.body;
  return service
    .updateTipoBebida({ tipoBebidaId, value })
    .then((data) => res.json(data));
}

export async function deleteTipoBebida(req, res) {
  const { tipoBebidaId } = req.params;
  return service.deleteTipoBebida(tipoBebidaId).then((data) => res.json(data));
}
