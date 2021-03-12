import { Acomp } from "../../utils";

export async function list() {
  return Acomp.find({})
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

export async function listOne({ acompId }) {
  return Acomp.findOne({ _id: acompId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addAcomp(value) {
  return Acomp.create(value);
}

export async function updateAcomp({ acompId, value }) {
  return Acomp.findOneAndUpdate({ _id: acompId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteAcomp(acompId) {
  return Acomp.findOneAndDelete({ _id: acompId });
}
