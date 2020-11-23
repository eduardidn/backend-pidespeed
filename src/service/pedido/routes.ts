import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/", CatchErrors(controller.list))
  .get("/:estado", CatchErrors(controller.listByEstado))
  .get("/list/by-usuario/:usuarioId", CatchErrors(controller.listByUsuario))
  .get("/list/one/:pedidoId", CatchErrors(controller.listOne))
  .get("/by-datos/:codigo/:precio", CatchErrors(controller.listOneByDatos))
  .get("/list/by-pago/:ids", CatchErrors(controller.listByIds))
  .post("/", CatchErrors(controller.addPedido))
  .put("/:id", CatchErrors(controller.updatePedido))
  .delete("/:id", CatchErrors(controller.deletePedido));
