import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:acompId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addAcomp))
  .put("/:acompId", CatchErrors(controller.updateAcomp))
  .delete("/:acompId", CatchErrors(controller.deleteAcomp));
