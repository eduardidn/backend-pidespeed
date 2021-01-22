import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId/:type", CatchErrors(controller.listUsuarios))
  .get("/list/one/:usuarioId/:type", CatchErrors(controller.listUsuario))
  .post("/", CatchErrors(controller.addUsuario))
  .post("/search-user-field", CatchErrors(controller.listUserCompanyByField))
  .put("/", CatchErrors(controller.updateUsuario))
  .delete("/:usuarioId", CatchErrors(controller.deleteUsuario));
