import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId/:tipo/public", CatchErrors(controller.list))
  .get("/by-ids/:ids/:tipo/public", CatchErrors(controller.listByIds))
  .get("/list/one/:adicionalId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addAdicional))
  .put("/:adicionalId", CatchErrors(controller.updateAdicional))
  .delete("/:adicionalId", CatchErrors(controller.deleteAdicional));
