import { Validator } from "@utils";
import * as service from "./service";

export async function loginUser(req, res) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service.loginUser({ user, password }).then((data) => res.json(data));
}

export async function loginEmpresa(req, res) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service
    .loginEmpresa({ user, password })
    .then((data) => res.json(data));
}

export async function loginAdmin(req, res) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service.loginAdmin({ user, password }).then((data) => res.json(data));
}

/**
 * UPDATE PASSWORD
 */

export async function listEmpresaByField(req, res) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listEmpresaByField({ field, value })
    .then((data) => res.json(data));
}

export async function updatePasswordUser(req, res) {
  const { password, email } = Validator.validate(req.body, "password");
  return service
    .updatePasswordUser({ email, password })
    .then((data) => res.json(data));
}

export async function updatePasswordEmpresa(req, res) {
  const { password, field, value } = Validator.validate(req.body, "password");
  return service
    .updatePasswordEmpresa({ field, value, password })
    .then((data) => res.json(data));
}

export async function updatePasswordAdmin(req, res) {
  const { password, adminId } = Validator.validate(req.body, "password");
  return service
    .updatePasswordAdmin({ adminId, password })
    .then((data) => res.json(data));
}

/**
 * USUARIOS
 */

export async function listUserByField(req, res) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listUserByField({ field, value })
    .then((data) => res.json(data));
}

export async function addUser(req, res) {
  return service.addUser(req.body).then((data) => res.json(data));
}

export async function updateUser(req, res) {
  const { usuarioId } = req.params;
  const value = req.body;
  return service
    .updateUser({ usuarioId, value })
    .then((data) => res.json(data));
}
