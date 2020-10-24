import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/", CatchErrors(controller.list))
  .get("/:estado", CatchErrors(controller.listByEstado))
  .get("/byUsuarios/:usuarioId", CatchErrors(controller.listByUsuario))
  .get("/list/one/:pedidoIid", CatchErrors(controller.listOne))
  .get("/byDatos/:codigo/:precio", CatchErrors(controller.listOneByDatos))
  .get("/list/byPago/:ids", CatchErrors(controller.listByIds))
  .post("/", CatchErrors(controller.addPedido))
  .put("/:id", CatchErrors(controller.updatePedido))
  .delete("/:id", CatchErrors(controller.deletePedido));
