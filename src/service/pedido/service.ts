import { Pedido } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Pedido.find()
    .populate("file", "url")
    .sort({ _id: -1 })
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

export async function listByEstado({ estado }) {
  let query: any = {};
  if (estado === "por-aprobar") query = { ...query, aprobado: 0, cancelado: 0 };
  if (estado === "terminados")
    query = { ...query, aprobado: 0, terminado: 0, cancelado: 0 };
  if (estado === "cancelados") query = { ...query, cancelado: 1 };
  return Pedido.find(query)
    .populate("file", "url")
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

export async function listByUsuario({ usuarioId }) {
  return Pedido.find({ usuario: usuarioId })
    .populate("file", "url")
    .sort({ _id: -1 })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
}

export async function listByIds({ ids }) {
  ids = ids.split(",");
  return Pedido.find({ _id: { $in: ids } })
    .populate("file", "url")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
}

export async function listOneByDatos({ codigo, precio }) {
  return Pedido.find({ codigo, precio })
    .populate("file", "url")
    .sort({ _id: -1 })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
}

export async function listOne({ pedidoId }) {
  return Pedido.findOne({ _id: pedidoId })
    .populate("file", "url")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addPedido(value) {
  return Pedido.create(value);
}

export async function updatePedido({ pedidoId, value }) {
  return Pedido.findOneAndUpdate({ _id: pedidoId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deletePedido(pedidoId) {
  return Pedido.findOneAndDelete({ _id: pedidoId });
}
