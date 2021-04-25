import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/:companyId", CatchErrors(controller.listDeliveryOrders))
  .get("/list/one/:DeliveryOrderId", CatchErrors(controller.listDeliveryOrder))
  .post("/delivery-price", CatchErrors(controller.getDeliveryPrice))
  .post("/", CatchErrors(controller.addDeliveryOrder))
  .put("/", CatchErrors(controller.updateDeliveryOrder))
  .delete("/", CatchErrors(controller.deleteDeliveryOrder));
