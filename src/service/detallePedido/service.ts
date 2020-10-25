import { DetallePedido } from "@models";
import { Socket } from "@utils";

export async function list() {
  return DetallePedido.find({})
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listPedidos({ pedidoId, empresaId }) {
  return DetallePedido.find({ pedido: pedidoId, empresa: empresaId })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listByPedido({ pedidoId }) {
  return DetallePedido.find({ pedido: pedidoId })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listOne({ detallePedidoId }) {
  return DetallePedido.findOne({ _id: detallePedidoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addDetallePedido(value) {
  return DetallePedido.create(value);
}

export async function updateDetallePedido({ detallePedidoId, value }) {
  return DetallePedido.findOneAndUpdate({ _id: detallePedidoId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteDetallePedido(detallePedidoId) {
  return DetallePedido.findOneAndDelete({ _id: detallePedidoId });
}
