import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:tipo/public", CatchErrors(controller.list))
  .get("/list/one/:categoriaId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addCategoria))
  .put("/:categoriaId", CatchErrors(controller.updateCategoria))
  .delete("/:categoriaId", CatchErrors(controller.deleteCategoria));
