import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .post("/cambio", CatchErrors(controller.mailCambio))
  .post("/estadoPedido", CatchErrors(controller.mailEstadoPedido))
  .post("/pedidoTerminado", CatchErrors(controller.mailPedidoListo))
  .post("/nuevoPedido", CatchErrors(controller.mailNuevoPedido))
  .post("/bienvenido", CatchErrors(controller.mailBienvenido))
  .post("/verificar", CatchErrors(controller.mailVerificacion))
  .post("/recuperarPass", CatchErrors(controller.mailRecuperarPass))
  .post("/promocion", CatchErrors(controller.mailPromocion));
