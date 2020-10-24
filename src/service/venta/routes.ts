import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId", CatchErrors(controller.list))
  .get("/list/all", CatchErrors(controller.listAll))
  .get("/list/noPagados/:empresaId", CatchErrors(controller.listNoPagados))
  .get("/listByPago/:ids", CatchErrors(controller.listByIds))
  .get("/list/one/:ventaId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addVenta))
  .put("/:ventaId", CatchErrors(controller.updateVenta))
  .delete("/:ventaId", CatchErrors(controller.deleteVenta));
