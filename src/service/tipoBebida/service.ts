import { TipoBebida } from "@models";
import { Socket } from "@utils";

export async function list() {
  return TipoBebida.find({}).lean();
}

export async function listOne({ tipoBebidaId }) {
  return TipoBebida.findOne({ _id: tipoBebidaId }).lean();
}

export async function addTipoBebida(value) {
  return TipoBebida.create(value);
}

export async function updateTipoBebida({ tipoBebidaId, value }) {
  return TipoBebida.findOneAndUpdate({ _id: tipoBebidaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteTipoBebida(tipoBebidaId) {
  return TipoBebida.findOneAndDelete({ _id: tipoBebidaId });
}
