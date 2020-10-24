import { Validator } from "@utils";
import * as service from "./service";

export async function loginUser(res, req) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service.loginUser({ user, password }).then((data) => res.json(data));
}

export async function loginEmpresa(res, req) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service
    .loginEmpresa({ user, password })
    .then((data) => res.json(data));
}

export async function loginAdmin(res, req) {
  const { user, password } = Validator.validate(req.body, "user password");
  return service.loginAdmin({ user, password }).then((data) => res.json(data));
}

/**
 * UPDATE PASSWORD
 */

export async function listEmpresaByField(res, req) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listEmpresaByField({ field, value })
    .then((data) => res.json(data));
}

export async function updatePasswordUser(res, req) {
  const { password, email } = Validator.validate(req.body, "password");
  return service
    .updatePasswordUser({ email, password })
    .then((data) => res.json(data));
}

export async function updatePasswordEmpresa(res, req) {
  const { password, field, value } = Validator.validate(req.body, "password");
  return service
    .updatePasswordEmpresa({ field, value, password })
    .then((data) => res.json(data));
}

export async function updatePasswordAdmin(res, req) {
  const { password, adminId } = Validator.validate(req.body, "password");
  return service
    .updatePasswordAdmin({ adminId, password })
    .then((data) => res.json(data));
}

/**
 * USUARIOS
 */

export async function listUserByField(res, req) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listUserByField({ field, value })
    .then((data) => res.json(data));
}

export async function addUser(req, res) {
  return service.addUser(req.body).then((data) => res.json(data));
}

export async function updateUser(req, res) {
  const { userId } = req.params;
  const value = req.body;
  return service.updateUser({ userId, value }).then((data) => res.json(data));
}
