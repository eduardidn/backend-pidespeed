import { HTTP400Error, DeliveryOrder } from "../../utils";

export function listDeliveryOrders({ empresaId }) {
  return DeliveryOrder.find({
    empresaDelivery: empresaId,
  })
    .populate("img")
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

export async function listDeliveryOrder({ DeliveryOrderId }) {
  return DeliveryOrder.findOne({ _id: DeliveryOrderId })
    .populate("img")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addDeliveryOrder(data) {
  return DeliveryOrder.create(data);
}

export async function updateDeliveryOrder({ value }) {
  if (!value._id) throw new HTTP400Error("object need to have the _id");
  const DeliveryOrderId = value._id;
  delete value._id;
  return DeliveryOrder.findOneAndUpdate({ _id: DeliveryOrderId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteDeliveryOrder(DeliveryOrderId) {
  const DeliveryOrderObject: any = await DeliveryOrder.findOneAndDelete({
    _id: DeliveryOrderId,
  });
  return DeliveryOrderObject;
}
