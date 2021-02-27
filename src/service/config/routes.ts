import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/list/one/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addConfig))
  .put("/:configId", CatchErrors(controller.updateConfig))
  .delete("/:configId", CatchErrors(controller.deleteConfig));
