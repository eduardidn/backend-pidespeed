import { Validator } from "@utils";
import * as service from "./service";

export async function list(res, req) {
  const { ruta, ciudadId } = req.params;
  return service.list({ ruta, ciudadId }).then((data) => res.json(data));
}

export async function listAll(res, req) {
  return service.listAll().then((data) => res.json(data));
}

export async function listAllInfo(res, req) {
  const { empresaId, ciudadId } = req.params;
  return service
    .listAllInfo({ empresaId, ciudadId })
    .then((data) => res.json(data));
}

export async function listHome(res, req) {
  const { type, ciudad, sort } = req.params;
  return service
    .listHome({ type, ciudad, sort })
    .then((data) => res.json(data));
}

export async function listSucursales(res, req) {
  const { empresaId } = req.params;
  return service.listSucursales({ empresaId }).then((data) => res.json(data));
}

export async function listOne(res, req) {
  const { field, value } = req.params;
  return service.listOne({ field, value }).then((data) => res.json(data));
}

export async function addVisita(res, req) {
  const { ruta } = req.params;
  return service.addVisita({ ruta }).then((data) => res.json(data));
}

export async function addVenta(res, req) {
  const { ruta } = req.params;
  return service.addVenta({ ruta }).then((data) => res.json(data));
}

export async function listOneEmpresaByField(res, req) {
  const { field, value } = req.params;
  return service
    .listOneEmpresaByField({ field, value })
    .then((data) => res.json(data));
}

export async function updatePassword(res, req) {
  const { field, value } = req.params;
  const { password } = req.body;
  return service
    .updatePassword({ field, value, password })
    .then((data) => res.json(data));
}

export async function addEmpresa(res, req) {
  return service.addEmpresa(req.body).then((data) => res.json(data));
}

export async function updateEmpresa(res, req) {
  const { empresaId } = req.params;
  const value = req.body;
  return service
    .updateEmpresa({ empresaId, value })
    .then((data) => res.json(data));
}

export async function deleteEmpresa(res, req) {
  const { empresaId } = req.params;
  return service.deleteEmpresa(empresaId).then((data) => res.json(data));
}
