import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/public/list/all/:coordenadas?", CatchErrors(controller.listAll))
  .get(
    "/public/home/:tipo/:sort/:ciudad?/:coordenadas?",
    CatchErrors(controller.listHome),
  )
  .get(
    "/public/categoria/:ruta/:ciudadId?/:coordenadas?",
    CatchErrors(controller.list),
  )
  .get(
    "/public/list/all/:empresaId/:ciudadId?/:coordenadas?",
    CatchErrors(controller.listAll),
  )
  .get("/public/one/:field/:value", CatchErrors(controller.listOne))
  .get(
    "/public/sucursales/:empresaId/:coordenadas?",
    CatchErrors(controller.listSucursales),
  )
  .get("/public/add-visita/:ruta", CatchErrors(controller.addVisita))
  .get("/add-venta/:ruta", CatchErrors(controller.addVenta))
  .post("/", CatchErrors(controller.addEmpresa))
  .put("/:empresaId", CatchErrors(controller.updateEmpresa))
  .delete("/:empresaId", CatchErrors(controller.deleteEmpresa));
