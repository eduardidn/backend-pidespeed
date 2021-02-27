import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listEmpresaPedidos(req, res) {
  const { pedidoId, empresaId } = req.params;
  return service
    .listEmpresaPedidos({ pedidoId, empresaId })
    .then((data) => res.json(data));
}

export async function listByPedido(req, res) {
  const { pedidoId } = req.params;
  return service.listByPedido({ pedidoId }).then((data) => res.json(data));
}

export async function listByEmpresa(req, res) {
  const { empresaId } = req.params;
  return service.listByEmpresa({ empresaId }).then((data) => res.json(data));
}

export async function listAllPendientes(req, res) {
  return service.listAllPendientes().then((data) => res.json(data));
}

export async function listAllTerminados(req, res) {
  return service.listAllTerminados().then((data) => res.json(data));
}

export async function listPendientes(req, res) {
  const { empresaId } = req.params;
  return service.listPendientes({ empresaId }).then((data) => res.json(data));
}

export async function listTerminados(req, res) {
  const { empresaId } = req.params;
  return service.listTerminados({ empresaId }).then((data) => res.json(data));
}

export async function listEntregados(req, res) {
  const { empresaId } = req.params;
  return service.listEntregados({ empresaId }).then((data) => res.json(data));
}

export async function listByIds(req, res) {
  const { ids } = req.params;
  return service.listByIds({ ids }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { empresaPedidoId } = req.params;
  return service.listOne({ empresaPedidoId }).then((data) => res.json(data));
}

export async function addEmpresaPedido(req, res) {
  return service.addEmpresaPedido(req.body).then((data) => res.json(data));
}

export async function updateEmpresaPedido(req, res) {
  const { empresaPedidoId } = req.params;
  const value = req.body;
  return service
    .updateEmpresaPedido({ empresaPedidoId, value })
    .then((data) => res.json(data));
}

export async function deleteEmpresaPedido(req, res) {
  const { empresaPedidoId } = req.params;
  return service
    .deleteEmpresaPedido(empresaPedidoId)
    .then((data) => res.json(data));
}
