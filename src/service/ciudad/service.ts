import { Ciudad } from "../../utils";

export async function list() {
  return Ciudad.find({})
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

export async function listOne({ ciudadId }) {
  return Ciudad.findOne({ _id: ciudadId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addCiudad(value) {
  return Ciudad.create(value);
}

export async function updateCiudad({ ciudadId, value }) {
  return Ciudad.findOneAndUpdate({ _id: ciudadId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteCiudad(ciudadId) {
  return Ciudad.findOneAndDelete({ _id: ciudadId });
}
