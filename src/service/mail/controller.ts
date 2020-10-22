import * as service from "./service";

export async function mailCambio(req, res) {
  return service.mailCambio(req.body).then((data) => res.json(data));
}
export async function mailEstadoPedido(req, res) {
  return service.mailEstadoPedido(req.body).then((data) => res.json(data));
}
export async function mailPedidoListo(req, res) {
  return service.mailPedidoListo(req.body).then((data) => res.json(data));
}
export async function mailNuevoPedido(req, res) {
  return service.mailNuevoPedido(req.body).then((data) => res.json(data));
}
export async function mailBienvenido(req, res) {
  return service.mailBienvenido(req.body).then((data) => res.json(data));
}
export async function mailRecuperarPass(req, res) {
  return service.mailRecuperarPass(req.body).then((data) => res.json(data));
}
export async function mailVerificacion(req, res) {
  return service.mailVerificacion(req.body).then((data) => res.json(data));
}
export async function mailPromocion(req, res) {
  return service.mailPromocion(req.body).then((data) => res.json(data));
}
