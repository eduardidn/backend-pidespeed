import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:ruta/:tipo/public", CatchErrors(controller.list))
  .get("/list/one/:productoId/public", CatchErrors(controller.listOne))
  .get(
    "/list/byDatos/:nombre/:descripcion",
    CatchErrors(controller.listOneByDatos),
  )
  .get(
    "/restarCantidad/:productoId/:cantidad",
    CatchErrors(controller.restarCantidad),
  )
  .get(
    "/list/categoriasEsp/:ruta/:tipo/public",
    CatchErrors(controller.listCatEsp),
  )
  .post("/", CatchErrors(controller.addProducto))
  .put("/:productoId", CatchErrors(controller.updateProducto))
  .delete("/:productoId", CatchErrors(controller.deleteProducto));
