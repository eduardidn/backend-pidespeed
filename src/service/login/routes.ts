import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .put("/setPasswordEmpresa", CatchErrors(controller.updatePasswordEmpresa))
  .post("/createUser", CatchErrors(controller.addUser))
  .post("/buscarUserField", CatchErrors(controller.listUserByField))
  .post("/buscarEmpresaField", CatchErrors(controller.listEmpresaByField))
  .put("/recuperarPassword", CatchErrors(controller.updatePasswordUser))
  .put(
    "/recuperarPasswordEmpresa",
    CatchErrors(controller.updatePasswordEmpresa),
  )
  .put("/recuperarPasswordAdmin", CatchErrors(controller.updatePasswordAdmin))
  .put("/setPasswordEmpresa", CatchErrors(controller.updatePasswordEmpresa))
  .post("/loginUser/", CatchErrors(controller.loginUser))
  .post("/loginEmpresa", CatchErrors(controller.loginEmpresa))
  .post("/loginAdmin", CatchErrors(controller.loginAdmin));

/**
 * @@deprecated
 */
/* .post('/buscarUserEmail/completo', CatchErrors(controller.buscarUserByEmail))
.get('/buscarEmpresaEmail/:email', CatchErrors(controller.buscarEmpresaEmail))
.post('/promocion', CatchErrors(controller.mailPromocion))
.post('/buscarUserUsername', CatchErrors(controller.buscarUserUsername))
.post('/buscarEmpresaUsername', CatchErrors(controller.buscarEmpresaUsername))
.post('/buscarUserTelefono', CatchErrors(controller.buscarUserTelefono))
.post('/buscarUserCedula', CatchErrors(controller.buscarUserCedula)) */
