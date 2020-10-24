import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listByEstado(req, res) {
  const { estado } = req.params;
  return service.listByEstado({ estado }).then((data) => res.json(data));
}

export async function listByUsuario(req, res) {
  const { usuarioId } = req.params;
  return service.listByUsuario({ usuarioId }).then((data) => res.json(data));
}

export async function listOneByDatos(req, res) {
  const { codigo, precio } = req.params;
  return service
    .listOneByDatos({ codigo, precio })
    .then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { ids } = req.params;
  return service.listByIds({ ids }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { pedidoId } = req.params;
  return service.listOne({ pedidoId }).then((data) => res.json(data));
}

export async function addPedido(req, res) {
  const { nombre } = Validator.validate(req.body, "nombre");
  return service.addPedido({ nombre }).then((data) => res.json(data));
}

export async function updatePedido(req, res) {
  const { pedidoId } = req.params;
  const value = req.body;
  return service
    .updatePedido({ pedidoId, value })
    .then((data) => res.json(data));
}

export async function deletePedido(req, res) {
  const { pedidoId } = req.params;
  return service.deletePedido(pedidoId).then((data) => res.json(data));
}
