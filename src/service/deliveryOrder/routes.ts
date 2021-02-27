import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/:empresaId", CatchErrors(controller.listDeliveryOrders))
  .get("/list/one/:DeliveryOrderId", CatchErrors(controller.listDeliveryOrder))
  .post("/", CatchErrors(controller.addDeliveryOrder))
  .put("/", CatchErrors(controller.updateDeliveryOrder))
  .delete("/", CatchErrors(controller.deleteDeliveryOrder));
