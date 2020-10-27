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
  .get("/public/addVisita/:ruta", CatchErrors(controller.addVisita))
  .get("/public/addVenta/:ruta", CatchErrors(controller.addVenta))
  .post("/", CatchErrors(controller.addEmpresa))
  .put("/:id", CatchErrors(controller.updateEmpresa))
  .delete("/:id", CatchErrors(controller.deleteEmpresa));