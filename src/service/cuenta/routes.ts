import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:cuentaId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addCuenta))
  .put("/:cuentaId", CatchErrors(controller.updateCuenta))
  .delete("/:cuentaId", CatchErrors(controller.deleteCuenta));
