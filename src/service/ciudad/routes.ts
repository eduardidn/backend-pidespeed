import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:ciudadId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addCiudad))
  .put("/:ciudadId", CatchErrors(controller.updateCiudad))
  .delete("/:ciudadId", CatchErrors(controller.deleteCiudad));
