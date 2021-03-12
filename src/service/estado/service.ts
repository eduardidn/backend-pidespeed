import { Estado } from "../../utils";

export async function list() {
  return Estado.find({})
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

export async function listOne({ estadoId }) {
  return Estado.findOne({ _id: estadoId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addEstado(value) {
  return Estado.create(value);
}

export async function updateEstado({ estadoId, value }) {
  return Estado.findOneAndUpdate({ _id: estadoId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteEstado(estadoId) {
  return Estado.findOneAndDelete({ _id: estadoId });
}
