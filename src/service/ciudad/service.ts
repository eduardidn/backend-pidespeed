import { Ciudad } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Ciudad.find({}).lean();
}

export async function listOne({ ciudadId }) {
  return Ciudad.findOne({ _id: ciudadId }).lean();
}

export async function addCiudad(value) {
  return Ciudad.create(value);
}

export async function updateCiudad({ ciudadId, value }) {
  return Ciudad.findOneAndUpdate({ _id: ciudadId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteCiudad(ciudadId) {
  return Ciudad.findOneAndDelete({ _id: ciudadId });
}