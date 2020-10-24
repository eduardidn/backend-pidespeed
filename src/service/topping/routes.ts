import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId/:tipo/public", CatchErrors(controller.list))
  .get("/byIds/:ids/:tipo/public", CatchErrors(controller.listByIds))
  .get("get/one/:toppingId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addTopping))
  .put("/:toppingId", CatchErrors(controller.updateTopping))
  .put("/byIds/:ids", CatchErrors(controller.updateByIds))
  .delete("/:toppingId", CatchErrors(controller.deleteTopping));
