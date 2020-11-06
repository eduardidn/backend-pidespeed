import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId", CatchErrors(controller.list))
  .get("/list/all", CatchErrors(controller.listAll))
  .get("/list/one/:pagoId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addPago))
  .put("/:pagoId", CatchErrors(controller.updatePago))
  .delete("/:pagoId", CatchErrors(controller.deletePago));
