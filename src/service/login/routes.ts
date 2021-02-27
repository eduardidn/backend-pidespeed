import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .put("/set-password-empresa", CatchErrors(controller.updatePasswordEmpresa))
  .post("/create-user", CatchErrors(controller.addUser))
  .post("/buscar-user-field", CatchErrors(controller.listUserByField))
  .post("/buscar-empresa-field", CatchErrors(controller.listEmpresaByField))
  .put("/recuperar-password", CatchErrors(controller.updatePasswordUser))
  .put(
    "/recuperar-password-empresa",
    CatchErrors(controller.updatePasswordEmpresa),
  )
  .put(
    "/recuperar-password-empresa-delivery",
    CatchErrors(controller.updatePasswordEmpresaDelivery),
  )
  .put("/recuperar-password-admin", CatchErrors(controller.updatePasswordAdmin))
  .put("/set-password-empresa", CatchErrors(controller.updatePasswordEmpresa))
  .post("/login-user/", CatchErrors(controller.loginUser))
  .post("/login-empresa", CatchErrors(controller.loginEmpresa))
  .post("/login-empresa-delivery", CatchErrors(controller.loginEmpresaDelivery))
  .post("/login-admin", CatchErrors(controller.loginAdmin));

/**
 * ../../../../deprecated
 */
/* .post('/buscarUserEmail/completo', CatchErrors(controller.buscarUserByEmail))
.get('/buscarEmpresaEmail/:email', CatchErrors(controller.buscarEmpresaEmail))
.post('/promocion', CatchErrors(controller.mailPromocion))
.post('/buscarUserUsername', CatchErrors(controller.buscarUserUsername))
.post('/buscarEmpresaUsername', CatchErrors(controller.buscarEmpresaUsername))
.post('/buscarUserTelefono', CatchErrors(controller.buscarUserTelefono))
.post('/buscarUserCedula', CatchErrors(controller.buscarUserCedula)) */
