import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:estadoId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addEstado))
  .put("/:estadoId", CatchErrors(controller.updateEstado))
  .delete("/:estadoId", CatchErrors(controller.deleteEstado));
