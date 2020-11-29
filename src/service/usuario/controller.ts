import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { usuarioId } = req.user;
  return service.listOne({ usuarioId }).then((data) => res.json(data));
}

export async function listOneById(req, res) {
  const { usuarioId } = req.params;
  return service.listOne({ usuarioId }).then((data) => res.json(data));
}

export async function updateUsuario(req, res) {
  const { usuarioId } = req.user;
  const value = req.body;
  return service
    .updateUsuario({ usuarioId, value })
    .then((data) => res.json(data));
}

export async function updateUsuarioPublic(req, res) {
  const { email } = req.params;
  const value = req.body;
  return service
    .updateUsuarioPublic({ email, value })
    .then((data) => res.json(data));
}

export async function updatePassword(req, res) {
  const { password, usuarioId } = Validator.validate(req.body, "password");
  return service
    .updatePassword({ usuarioId, password })
    .then((data) => res.json(data));
}

export async function deleteUsuario(req, res) {
  const { usuarioId } = req.user;
  return service.deleteUsuario(usuarioId).then((data) => res.json(data));
}
