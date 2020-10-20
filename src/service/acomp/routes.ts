import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/list", CatchErrors(controller.list))
  .get("/:acompId/list", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addAcomp))
  .put("/:acompId", CatchErrors(controller.updateAcomp))
  .delete("/:acompId", CatchErrors(controller.deleteAcomp));
