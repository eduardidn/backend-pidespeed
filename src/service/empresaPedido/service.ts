import { EmpresaPedido } from "@models";
import { Socket } from "@utils";

export async function list() {
  return EmpresaPedido.find({})
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

export async function listEmpresaPedidos({ pedidoId, empresaId }) {
  return EmpresaPedido.find({ pedido: pedidoId, empresa: empresaId })
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
  return EmpresaPedido.find({ pedido: pedidoId })
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

export async function listByEmpresa({ empresaId }) {
  return EmpresaPedido.find({ empresa: empresaId })
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

export async function listAllPendientes() {
  return EmpresaPedido.find({ terminado: 0, entregado: 0 })
    .populate({
      path: "empresa",
      select: "nombre email telefono logo",
      populate: { path: "logo", select: "url" },
    })
    .sort({ date: 1 })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
}

export async function listAllTerminados() {
  return EmpresaPedido.find({ terminado: 1, entregado: 0 })
    .populate({
      path: "empresa",
      select: "nombre email telefono logo",
      populate: { path: "logo", select: "url" },
    })
    .sort({ date: 1 })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
}

export async function listPendientes({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 0,
    entregado: 0,
  })
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

export async function listTerminados({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 1,
    entregado: 0,
  })
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

export async function listEntregados({ empresaId }) {
  return EmpresaPedido.find({
    empresa: empresaId,
    terminado: 1,
    entregado: 1,
  })
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

export async function listByIds({ ids }) {
  ids = ids.split(",");
  return EmpresaPedido.find({ _id: { $in: ids } })
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

export async function listOne({ empresaPedidoId }) {
  return EmpresaPedido.findOne({ _id: empresaPedidoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addEmpresaPedido(value) {
  return EmpresaPedido.create(value);
}

export async function updateEmpresaPedido({ empresaPedidoId, value }) {
  return EmpresaPedido.findOneAndUpdate({ _id: empresaPedidoId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteEmpresaPedido(empresaPedidoId) {
  return EmpresaPedido.findOneAndDelete({ _id: empresaPedidoId });
}
