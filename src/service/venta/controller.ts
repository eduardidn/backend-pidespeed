import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  const { empresaId } = req.params;
  return service.list({ empresaId }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listNoPagados(req, res) {
  const { empresaId } = req.params;
  return service.listNoPagados({ empresaId }).then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { ids } = req.params;
  return service.listByIds({ ids }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { ventaId } = req.params;
  return service.listOne({ ventaId }).then((data) => res.json(data));
}

export async function addVenta(req, res) {
  return service.addVenta(req.body).then((data) => res.json(data));
}

export async function updateVenta(req, res) {
  const { ventaId } = req.params;
  const value = req.body;
  return service.updateVenta({ ventaId, value }).then((data) => res.json(data));
}

export async function deleteVenta(req, res) {
  const { ventaId } = req.params;
  return service.deleteVenta(ventaId).then((data) => res.json(data));
}
