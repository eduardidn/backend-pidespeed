import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:tipo/public", CatchErrors(controller.list))
  .get("get/one/:categoriaProductoId/public", CatchErrors(controller.listOne))
  .post("/", CatchErrors(controller.addCategoriaProducto))
  .put("/:categoriaProductoId", CatchErrors(controller.updateCategoriaProducto))
  .delete(
    "/:categoriaProductoId",
    CatchErrors(controller.deleteCategoriaProducto),
  );
