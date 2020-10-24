import { Venta } from "@models";
import { Socket } from "@utils";

export async function list({ empresaId }) {
  return Venta.find({ empresa: empresaId }).lean();
}

export async function listAll() {
  return Venta.find({}).lean();
}

export async function listNoPagados({ empresaId }) {
  return Venta.find({ empresa: empresaId, pagado: 0 }).lean();
}

export async function listByIds({ ids }) {
  ids = ids.split(",");
  return Venta.find({ _id: { $in: ids } }).lean();
}

export async function listOne({ ventaId }) {
  return Venta.findOne({ _id: ventaId }).lean();
}

export async function addVenta(value) {
  return Venta.create(value);
}

export async function updateVenta({ ventaId, value }) {
  return Venta.findOneAndUpdate({ _id: ventaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteVenta(ventaId) {
  return Venta.findOneAndDelete({ _id: ventaId });
}
