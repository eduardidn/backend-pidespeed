import { EmpresaPedido } from "@models";
import { Socket } from "@utils";

export async function list() {
  return EmpresaPedido.find({}).lean();
}

export async function listEmpresaPedidos({ pedidoId, empresaId }) {
  return EmpresaPedido.find({ pedido: pedidoId, empresa: empresaId }).lean();
}

export async function listByPedido({ pedidoId }) {
  return EmpresaPedido.find({ pedido: pedidoId }).lean();
}

export async function listByEmpresa({ empresaId }) {
  return EmpresaPedido.find({ empresa: empresaId }).lean();
}

export async function listAllPendientes() {
  return EmpresaPedido.find({ terminado: 0, entregado: 0 })
    .populate("empresa", "nombre email telefono logo")
    .sort({ date: 1 })
    .lean();
}

export async function listAllTerminados() {
  return EmpresaPedido.find({ terminado: 1, entregado: 0 })
    .populate("empresa", "nombre email telefono logo")
    .sort({ date: 1 })
    .lean();
}

export async function listPendientes({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 0,
    entregado: 0,
  }).lean();
}

export async function listTerminados({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 1,
    entregado: 0,
  }).lean();
}

export async function listEntregados({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 1,
    entregado: 1,
  }).lean();
}

export async function listByIds({ ids }) {
  ids = ids.split(",");
  return EmpresaPedido.find({ _id: { $in: ids } }).lean();
}

export async function listOne({ empresaPedidoId }) {
  return EmpresaPedido.findOne({ _id: empresaPedidoId }).lean();
}

export async function addEmpresaPedido(value) {
  return EmpresaPedido.create(value);
}

export async function updateEmpresaPedido({ empresaPedidoId, value }) {
  return EmpresaPedido.findOneAndUpdate({ _id: empresaPedidoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteEmpresaPedido(empresaPedidoId) {
  return EmpresaPedido.findOneAndDelete({ _id: empresaPedidoId });
}
