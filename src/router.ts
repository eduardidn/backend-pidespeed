import express from "express";

import { ErrorHandle } from "./utils";

import exampleRoutes from "./service/module_base";
import acomp from "./service/acomp";
import adicional from "./service/adicional";
import companyPartner from "./service/companyPartner";
import bebida from "./service/bebida";
import categoriaProducto from "./service/categoriaProducto";
import categoria from "./service/categoria";
import ciudad from "./service/ciudad";
import config from "./service/config";
import cuenta from "./service/cuenta";
import detallePedido from "./service/detallePedido";
import deliveryOrder from "./service/deliveryOrder";
import empresa from "./service/empresa";
import empresaDelivery from "./service/empresaDelivery";
import empresaPedido from "./service/empresaPedido";
import estado from "./service/estado";
import faq from "./service/faq";
import favorito from "./service/favorito";
import file from "./service/file";
import login from "./service/login";
import mail from "./service/mail";
import pago from "./service/pago";
import pedido from "./service/pedido";
import producto from "./service/producto";
import role from "./service/role";
import sabor from "./service/sabor";
import sirope from "./service/sirope";
import tamano from "./service/tamano";
import tipoBebida from "./service/tipoBebida";
import topping from "./service/topping";
import usuario from "./service/usuario";
import usuarioEmpresa from "./service/usuarioEmpresa";
import venta from "./service/venta";
import zona from "./service/zona";

export default async function (app) {
  const router = express
    .Router()
    .use(acomp)
    .use(adicional)
    .use(companyPartner)
    .use(bebida)
    .use(categoriaProducto)
    .use(categoria)
    .use(ciudad)
    .use(config)
    .use(cuenta)
    .use(detallePedido)
    .use(deliveryOrder)
    .use(empresa)
    .use(empresaDelivery)
    .use(empresaPedido)
    .use(estado)
    .use(faq)
    .use(favorito)
    .use(file)
    .use(login)
    .use(mail)
    .use(pago)
    .use(pedido)
    .use(producto)
    .use(role)
    .use(sabor)
    .use(sirope)
    .use(tamano)
    .use(tipoBebida)
    .use(topping)
    .use(usuario)
    .use(usuarioEmpresa)
    .use(venta)
    .use(zona)
    .use(exampleRoutes);

  app.use("/api", router).use(ErrorHandle);
  return app;
}
