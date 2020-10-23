import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
import catchErrors from "@/utils/CatchErrors";
export default express
  .Router()
  .get("/public/list/all", catchErrors(controller.listAll))
  .get("/public/home/:type/:ciudadId/:sort", catchErrors(controller.listHome))
  .get("/public/categoria/:ruta/:ciudad?", catchErrors(controller.list))
  .get("/public/get/all/:empresaId/:ciudad?", catchErrors(controller.listAll))
  .get("/public/one/:field/:value", catchErrors(controller.listOne))
  .get("/sucursales/:empresaId", catchErrors(controller.listSucursales))
  .get(
    "/public/buscarEmpresaEmail/:field/:value",
    catchErrors(controller.listOneEmpresaByField),
  )
  .put("/public/addvisita/:ruta", catchErrors(controller.addVisita))
  .put("/public/addventa/:ruta", catchErrors(controller.addVenta))
  .put(
    "/public/setPasswordEmpresa/:field/:value",
    catchErrors(controller.updatePassword),
  )
  .post("/", catchErrors(controller.addEmpresa))
  .put("/:id", catchErrors(controller.updateEmpresa))
  .delete("/:id", catchErrors(controller.deleteEmpresa));
