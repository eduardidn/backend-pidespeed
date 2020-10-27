import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { usuarioId } = req.user;
  return service.listOne({ usuarioId }).then((data) => res.json(data));
}

export async function updateUsuario(req, res) {
  const { usuarioId } = req.user;
  const value = req.body;
  return service
    .updateUsuario({ usuarioId, value })
    .then((data) => res.json(data));
}

export async function updatePassword(res, req) {
  const { usuarioId } = req.user;
  const { password } = Validator.validate(req.body, "password");
  return service
    .updatePassword({ usuarioId, password })
    .then((data) => res.json(data));
}

export async function deleteUsuario(req, res) {
  const { usuarioId } = req.user;
  return service.deleteUsuario(usuarioId).then((data) => res.json(data));
}