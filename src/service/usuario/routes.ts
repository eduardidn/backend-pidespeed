import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/list/all/public", CatchErrors(controller.list))
  .get("/one", CatchErrors(controller.listOne))
  .get("/list/one/:usuarioId", CatchErrors(controller.listOneById))
  .put("/", CatchErrors(controller.updateUsuario))
  .put("/:email/public", CatchErrors(controller.updateUsuarioPublic))
  .put("/password", CatchErrors(controller.updatePassword))
  .delete("/", CatchErrors(controller.deleteUsuario));
