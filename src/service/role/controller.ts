import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { empresaId } = req.params;
  return service.list({ empresaId }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { roleId } = req.params;
  return service.listOne({ roleId }).then((data) => res.json(data));
}

export async function addRole(req, res) {
  // const { nombre } = Validator.validate(req.body, "nombre");
  return service.addRole(req.body).then((data) => res.json(data));
}

export async function updateRole(req, res) {
  const { roleId } = req.params;
  const value = req.body;
  return service.updateRole({ roleId, value }).then((data) => res.json(data));
}

export async function deleteRole(req, res) {
  const { roleId } = req.params;
  return service.deleteRole(roleId).then((data) => res.json(data));
}
