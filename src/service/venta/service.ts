import { Venta } from "../../utils";

export async function list({ empresaId }) {
  return Venta.find({ empresa: empresaId })
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

export async function listAll() {
  return Venta.find({})
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

export async function listNoPagados({ empresaId }) {
  return Venta.find({ empresa: empresaId, pagado: 0 })
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
  return Venta.find({ _id: { $in: ids } })
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

export async function listOne({ ventaId }) {
  return Venta.findOne({ _id: ventaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addVenta(value) {
  return Venta.create(value);
}

export async function updateVenta({ ventaId, value }) {
  return Venta.findOneAndUpdate({ _id: ventaId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteVenta(ventaId) {
  return Venta.findOneAndDelete({ _id: ventaId });
}
