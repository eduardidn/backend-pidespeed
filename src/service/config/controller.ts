import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  return service.listOne().then((data) => res.json(data));
}

export async function addConfig(req, res) {
  const {
    tasa_dt,
    tasa_bcv,
    nombre,
    rif,
    email_pagos,
    telefono,
    promo,
  } = Validator.validate(
    req.body,
    "tasa_dt tasa_bcv nombre rif email_pagos telefono promo",
  );
  return service
    .addConfig({ tasa_dt, tasa_bcv, nombre, rif, email_pagos, telefono, promo })
    .then((data) => res.json(data));
}

export async function updateConfig(req, res) {
  const { configId } = req.params;
  const value = req.body;
  return service
    .updateConfig({ configId, value })
    .then((data) => res.json(data));
}

export async function deleteConfig(req, res) {
  const { configId } = req.params;
  return service.deleteConfig(configId).then((data) => res.json(data));
}
