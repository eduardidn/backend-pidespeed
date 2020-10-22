import { DetallePedido } from "@models";
import { Socket } from "@utils";

export async function list() {
  return DetallePedido.find({}).lean();
}

export async function listPedidos({ pedidoId, empresaId }) {
  return DetallePedido.find({ pedido: pedidoId, empresa: empresaId }).lean();
}

export async function listByPedido({ pedidoId }) {
  return DetallePedido.find({ pedido: pedidoId }).lean();
}

export async function listOne({ detallePedidoId }) {
  return DetallePedido.findOne({ _id: detallePedidoId }).lean();
}

export async function addDetallePedido(value) {
  return DetallePedido.create(value);
}

export async function updateDetallePedido({ detallePedidoId, value }) {
  return DetallePedido.findOneAndUpdate({ _id: detallePedidoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteDetallePedido(detallePedidoId) {
  return DetallePedido.findOneAndDelete({ _id: detallePedidoId });
}
