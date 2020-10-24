import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/public/list/all", CatchErrors(controller.listAll))
  .get("/public/home/:tipo/:ciudadId/:sort", CatchErrors(controller.listHome))
  .get("/public/categoria/:ruta/:ciudad?", CatchErrors(controller.list))
  .get("/public/list/all/:empresaId/:ciudad?", CatchErrors(controller.listAll))
  .get("/public/one/:field/:value", CatchErrors(controller.listOne))
  .get("/sucursales/:empresaId", CatchErrors(controller.listSucursales))
  .put("/public/addvisita/:ruta", CatchErrors(controller.addVisita))
  .put("/public/addventa/:ruta", CatchErrors(controller.addVenta))
  .post("/", CatchErrors(controller.addEmpresa))
  .put("/:id", CatchErrors(controller.updateEmpresa))
  .delete("/:id", CatchErrors(controller.deleteEmpresa));
