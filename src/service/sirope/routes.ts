import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId/:tipo/public", CatchErrors(controller.list))
  .get("/byIds/:ids/:tipo/public", CatchErrors(controller.listByIds))
  .get("/list/one/:siropeId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addSirope))
  .put("/:siropeId", CatchErrors(controller.updateSirope))
  .put("/byIds/:ids", CatchErrors(controller.updateByIds))
  .delete("/:siropeId", CatchErrors(controller.deleteSirope));
