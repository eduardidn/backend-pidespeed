import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/public", CatchErrors(controller.list))
  .get("/:faqId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addFaq))
  .put("/:faqId", CatchErrors(controller.updateFaq))
  .delete("/:faqId", CatchErrors(controller.deleteFaq));
