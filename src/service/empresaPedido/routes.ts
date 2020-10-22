import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/", CatchErrors(controller.list))
  .get(
    "/byEmpresaByPedido/:pedidoId/:empresaId",
    CatchErrors(controller.listEmpresaPedidos),
  )
  .get("/byPedido/:pedidoId", CatchErrors(controller.listByPedido))
  .get("/byEmpresa/:EmpresaId", CatchErrors(controller.listByEmpresa))
  .get("/todos/pendientes", CatchErrors(controller.listAllPendientes))
  .get("/todos/terminados", CatchErrors(controller.listAllTerminados))
  .get("/pendientes/:empresaId", CatchErrors(controller.listPendientes))
  .get("/terminados/:empresaId", CatchErrors(controller.listTerminados))
  .get("/entregados/:empresaId", CatchErrors(controller.listEntregados))
  .get("/get/byPago/:ids", CatchErrors(controller.listByIds))
  .get("/:empresaPedidoId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addEmpresaPedido))
  .put("/:empresaPedidoId", CatchErrors(controller.updateEmpresaPedido))
  .delete("/:empresaPedidoId", CatchErrors(controller.deleteEmpresaPedido));
