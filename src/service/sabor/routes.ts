import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId/:tipo/public", CatchErrors(controller.list))
  .get("/byIds/:ids/:tipo/public", CatchErrors(controller.listByIds))
  .get("get/one/:saborId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addSabor))
  .put("/:saborId", CatchErrors(controller.updateSabor))
  .put("/byIds/:ids", CatchErrors(controller.updateByIds))
  .delete("/:saborId", CatchErrors(controller.deleteSabor));
