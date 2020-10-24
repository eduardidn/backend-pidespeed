import { Zona } from "@models";
import { Socket } from "@utils";

export async function list({ ciudadId }) {
  return Zona.find({ ciudad: ciudadId }).sort({ nombre: 1 }).lean();
}

export async function listAll() {
  return Zona.find({}).lean();
}

export async function listByIds({ ids }) {
  ids = ids.split(",");
  return Zona.find({ _id: { $in: ids } }).lean();
}

export async function listOne({ zonaId }) {
  return Zona.findOne({ _id: zonaId }).lean();
}

export async function addZona(value) {
  return Zona.create(value);
}

export async function updateZona({ zonaId, value }) {
  return Zona.findOneAndUpdate({ _id: zonaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteZona(zonaId) {
  return Zona.findOneAndDelete({ _id: zonaId });
}
