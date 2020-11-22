import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/", CatchErrors(controller.list))
  .get("/:pedidoId/:empresaId", CatchErrors(controller.listPedidos))
  .get("/list/by-pedido/:pedidoId", CatchErrors(controller.listByPedido))
  .get("/:detallePedidoId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addDetallePedido))
  .put("/:detallePedidoId", CatchErrors(controller.updateDetallePedido))
  .delete("/:detallePedidoId", CatchErrors(controller.deleteDetallePedido));
