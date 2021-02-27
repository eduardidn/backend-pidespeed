import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("", CatchErrors(controller.list))
  .get("/:cuentaId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addCuenta))
  .put("/:cuentaId", CatchErrors(controller.updateCuenta))
  .delete("/:cuentaId", CatchErrors(controller.deleteCuenta));
