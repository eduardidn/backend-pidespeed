import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  // .get("/:empresaId", CatchErrors(controller.list))
  .get("/list/all", CatchErrors(controller.listAll))
  .get("/list/one/:roleId", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addRole))
  .put("/:roleId", CatchErrors(controller.updateRole))
  .delete("/:roleId", CatchErrors(controller.deleteRole));
