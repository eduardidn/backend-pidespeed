import express from "express";

import { ErrorHandle } from "@middlewares";

import exampleRoutes from "./service/module_base";
import acomp from "./service/acomp";
import adicional from "./service/adicional";
import bebida from "./service/bebida";
import categoriaProducto from "./service/categoriaProducto";
import categoria from "./service/categoria";
import ciudad from "./service/ciudad";
import config from "./service/config";
import cuenta from "./service/cuenta";
import detallePedido from "./service/detallePedido";
import empresaPedido from "./service/empresaPedido";
import estado from "./service/estado";
import faq from "./service/faq";
import mail from "./service/mail";
import pago from "./service/pago";
import sabor from "./service/sabor";
import sirope from "./service/sirope";
import tipoBebida from "./service/tipoBebida";

export default async function (app) {
  const router = express
    .Router()
    .use(acomp)
    .use(adicional)
    .use(bebida)
    .use(categoriaProducto)
    .use(categoria)
    .use(ciudad)
    .use(config)
    .use(cuenta)
    .use(detallePedido)
    .use(empresaPedido)
    .use(estado)
    .use(faq)
    .use(mail)
    .use(pago)
    .use(sabor)
    .use(sirope)
    .use(tipoBebida)
    .use(exampleRoutes);

  app.use("/api", router).use(ErrorHandle);
  return app;
}
