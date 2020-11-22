import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .post("/cambio", CatchErrors(controller.mailCambio))
  .post("/estado-pedido", CatchErrors(controller.mailEstadoPedido))
  .post("/pedido-terminado", CatchErrors(controller.mailPedidoListo))
  .post("/nuevo-pedido", CatchErrors(controller.mailNuevoPedido))
  .post("/bienvenido/public", CatchErrors(controller.mailBienvenido))
  .post("/verificar/public", CatchErrors(controller.mailVerificacion))
  .post("/recuperar-pass/public", CatchErrors(controller.mailRecuperarPass))
  .post("/promocion/public", CatchErrors(controller.mailPromocion));
