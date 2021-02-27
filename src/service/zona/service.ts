import { Zona } from "../../utils";

export async function list({ ciudadId }) {
  return Zona.find({ ciudad: ciudadId })
    .sort({ nombre: 1 })
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
  return Zona.find({})
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
  return Zona.find({ _id: { $in: ids } })
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

export async function listOne({ zonaId }) {
  return Zona.findOne({ _id: zonaId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addZona(value) {
  return Zona.create(value);
}

export async function updateZona({ zonaId, value }) {
  return Zona.findOneAndUpdate({ _id: zonaId }, value, {
    new: true,

  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteZona(zonaId) {
  return Zona.findOneAndDelete({ _id: zonaId });
}
