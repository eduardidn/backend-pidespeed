import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:ids/:tipo/public", CatchErrors(controller.list))
  .get("/list/all/public", CatchErrors(controller.listAll))
  .get(
    "/list/by-empresa/:empresaId/public",
    CatchErrors(controller.listByEmpresa),
  )
  .get("/list/one/:tamanoId/public", CatchErrors(controller.listOne))
  .put("/:tamanoId", CatchErrors(controller.updateTamano))
  .post("/", CatchErrors(controller.addTamano))
  .delete("/:tamanoId", CatchErrors(controller.deleteTamano));
