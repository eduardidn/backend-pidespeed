import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/", CatchErrors(controller.list))
  .get(
    "/by-empresa-and-pedido/:pedidoId/:empresaId",
    CatchErrors(controller.listEmpresaPedidos),
  )
  .get("/by-pedido/:pedidoId", CatchErrors(controller.listByPedido))
  .get("/by-empresa/:empresaId", CatchErrors(controller.listByEmpresa))
  .get("/todos/pendientes", CatchErrors(controller.listAllPendientes))
  .get("/todos/terminados", CatchErrors(controller.listAllTerminados))
  .get("/pendientes/:empresaId", CatchErrors(controller.listPendientes))
  .get("/terminados/:empresaId", CatchErrors(controller.listTerminados))
  .get("/entregados/:empresaId", CatchErrors(controller.listEntregados))
  .get("/list/by-pago/:ids", CatchErrors(controller.listByIds))
  .get("/:empresaPedidoId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addEmpresaPedido))
  .put("/:empresaPedidoId", CatchErrors(controller.updateEmpresaPedido))
  .delete("/:empresaPedidoId", CatchErrors(controller.deleteEmpresaPedido));
