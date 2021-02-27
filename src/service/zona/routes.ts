import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/:ciudadId/public", CatchErrors(controller.list))
  .get("/list/all/public", CatchErrors(controller.listAll))
  .get("/list/by-ids/:ids/public", CatchErrors(controller.listByIds))
  .get("/list/one/:zonaId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addZona))
  .put("/:zonaId", CatchErrors(controller.updateZona))
  .delete("/:zonaId", CatchErrors(controller.deleteZona));
