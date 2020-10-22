import { Estado } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Estado.find({}).lean();
}

export async function listOne({ estadoId }) {
  return Estado.findOne({ _id: estadoId }).lean();
}

export async function addEstado(value) {
  return Estado.create(value);
}

export async function updateEstado({ estadoId, value }) {
  return Estado.findOneAndUpdate({ _id: estadoId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteEstado(estadoId) {
  return Estado.findOneAndDelete({ _id: estadoId });
}
