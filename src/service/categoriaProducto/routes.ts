import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:tipo/public", CatchErrors(controller.list))
  .get("list/one/:categoriaProductoId/public", CatchErrors(controller.listOne))
  .get("/list/categorias/:ruta/:tipo?", CatchErrors(controller.listByRuta))
  .post("/", CatchErrors(controller.addCategoriaProducto))
  .put("/:categoriaProductoId", CatchErrors(controller.updateCategoriaProducto))
  .delete(
    "/:categoriaProductoId",
    CatchErrors(controller.deleteCategoriaProducto),
  );
