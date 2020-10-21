import { Acomp } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Acomp.find({}).lean();
}

export async function listOne({ acompId }) {
  return Acomp.findOne({ _id: acompId }).lean();
}

export async function addAcomp(value) {
  return Acomp.create(value);
}

export async function updateAcomp({ acompId, value }) {
  return Acomp.findOneAndUpdate({ _id: acompId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteAcomp(acompId) {
  return Acomp.findOneAndDelete({ _id: acompId });
}
