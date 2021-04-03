import { Validator } from "../../utils";
import * as service from "./service";

export async function listDeliveryOrders(req, res) {
  return service.listDeliveryOrders(req.params).then((data) => res.json(data));
}

export async function listDeliveryOrder(req, res) {
  return service.listDeliveryOrder(req.params).then((data) => res.json(data));
}

export async function getDeliveryPrice(req, res) {
  const { empresas } = Validator.validate(req.body, "empresas");
  return service.getDeliveryPrice(empresas).then((data) => res.json(data));
}

export async function addDeliveryOrder(req, res) {
  return service.addDeliveryOrder(req.body).then((data) => res.json(data));
}

export async function updateDeliveryOrder(req, res) {
  const value = req.body;
  return service.updateDeliveryOrder({ value }).then((data) => res.json(data));
}

export async function deleteDeliveryOrder(req, res) {
  const { DeliveryOrderId } = req.body;
  return service
    .deleteDeliveryOrder(DeliveryOrderId)
    .then((data) => res.json(data));
}
