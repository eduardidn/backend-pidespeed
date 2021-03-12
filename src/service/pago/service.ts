import { Pago } from "../../utils";

export async function list({ empresaId }) {
  return Pago.find({ empresa: empresaId })
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
  return Pago.find({})
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

export async function listOne({ pagoId }) {
  return Pago.findOne({ _id: pagoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addPago(value) {
  return Pago.create(value);
}

export async function updatePago({ pagoId, value }) {
  return Pago.findOneAndUpdate({ _id: pagoId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deletePago(pagoId) {
  return Pago.findOneAndDelete({ _id: pagoId });
}
