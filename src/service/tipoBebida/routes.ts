import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:tipoBebidaId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addTipoBebida))
  .put("/:tipoBebidaId", CatchErrors(controller.updateTipoBebida))
  .delete("/:tipoBebidaId", CatchErrors(controller.deleteTipoBebida));
