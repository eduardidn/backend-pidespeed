import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId", CatchErrors(controller.listPartners))
  .get("/list/one/:partnerId", CatchErrors(controller.listPartner))
  .post("/search-partner-field", CatchErrors(controller.listPartnerByField))
  .post("/", CatchErrors(controller.addPartner))
  .put("/", CatchErrors(controller.updatePartner))
  .delete("/", CatchErrors(controller.deletePartner));
