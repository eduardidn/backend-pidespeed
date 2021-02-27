import { TipoBebida } from "../../utils";

export async function list() {
  return TipoBebida.find({})
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

export async function listOne({ tipoBebidaId }) {
  return TipoBebida.findOne({ _id: tipoBebidaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addTipoBebida(value) {
  return TipoBebida.create(value);
}

export async function updateTipoBebida({ tipoBebidaId, value }) {
  return TipoBebida.findOneAndUpdate({ _id: tipoBebidaId }, value, {
    new: true,

  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteTipoBebida(tipoBebidaId) {
  return TipoBebida.findOneAndDelete({ _id: tipoBebidaId });
}
