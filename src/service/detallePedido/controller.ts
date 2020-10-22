import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listPedidos(req, res) {
  const { pedidoId, empresaId } = req.params;
  return service
    .listPedidos({ pedidoId, empresaId })
    .then((data) => res.json(data));
}

export async function listByPedido(req, res) {
  const { pedidoId } = req.params;
  return service.listByPedido({ pedidoId }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { detallePedidoId } = req.params;
  return service.listOne({ detallePedidoId }).then((data) => res.json(data));
}

export async function addDetallePedido(req, res) {
  return service.addDetallePedido(req.body).then((data) => res.json(data));
}

export async function updateDetallePedido(req, res) {
  const { detallePedidoId } = req.params;
  const value = req.body;
  return service
    .updateDetallePedido({ detallePedidoId, value })
    .then((data) => res.json(data));
}

export async function deleteDetallePedido(req, res) {
  const { detallePedidoId } = req.params;
  return service
    .deleteDetallePedido(detallePedidoId)
    .then((data) => res.json(data));
}
