import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:ruta/:tipo/public", CatchErrors(controller.list))
  .get("/list/one/:productoId/public", CatchErrors(controller.listOne))
  .get(
    "/list/by-datos/:nombre/:descripcion",
    CatchErrors(controller.listOneByDatos),
  )
  .get(
    "/restar-cantidad/:productoId/:cantidad",
    CatchErrors(controller.restarCantidad),
  )
  .get(
    "/list/categorias-esp/:ruta/:tipo/public",
    CatchErrors(controller.listCatEsp),
  )
  .post("/", CatchErrors(controller.addProducto))
  .put("/:productoId", CatchErrors(controller.updateProducto))
  .delete("/:productoId", CatchErrors(controller.deleteProducto));
