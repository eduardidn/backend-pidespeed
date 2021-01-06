import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/public/list/all", CatchErrors(controller.listAll))
  .get("/public/home/:tipo/:sort/:ciudad?", CatchErrors(controller.listHome))
  .get("/public/categoria/:ruta/:ciudadId?", CatchErrors(controller.list))
  .get(
    "/public/list/all/:empresaId/:ciudadId?",
    CatchErrors(controller.listAll),
  )
  .get("/public/one/:field/:value", CatchErrors(controller.listOne))
  .get("/public/sucursales/:empresaId", CatchErrors(controller.listSucursales))
  .get("/public/add-visita/:ruta", CatchErrors(controller.addVisita))
  .get("/add-venta/:ruta", CatchErrors(controller.addVenta))
  .post("/public", CatchErrors(controller.addEmpresa))
  .put("/:empresaId", CatchErrors(controller.updateEmpresa))
  .delete("/:empresaId", CatchErrors(controller.deleteEmpresa));
