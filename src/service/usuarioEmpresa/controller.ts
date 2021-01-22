import { Validator } from "@utils";
import * as service from "./service";

export async function listUsuarios(req, res) {
  return service.listUsuarios(req.params).then((data) => res.json(data));
}

export async function listUsuario(req, res) {
  return service.listUsuario(req.params).then((data) => res.json(data));
}

export async function listUserCompanyByField(req, res) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listUserCompanyByField({ field, value })
    .then((data) => res.json(data));
}

export async function addUsuario(req, res) {
  return service.addUsuario(req.body).then((data) => res.json(data));
}

export async function updateUsuario(req, res) {
  const { usuarioId } = req.user;
  const value = req.body;
  return service
    .updateUsuario({ usuarioId, value })
    .then((data) => res.json(data));
}

export async function deleteUsuario(req, res) {
  const { usuarioId } = req.params;
  return service.deleteUsuario(usuarioId).then((data) => res.json(data));
}
