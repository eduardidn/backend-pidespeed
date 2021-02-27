import { Validator } from "../../utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { cuentaId } = req.params;
  return service.listOne({ cuentaId }).then((data) => res.json(data));
}

export async function addCuenta(req, res) {
  const { cuenta, banco, pago_movil } = Validator.validate(
    req.body,
    "cuenta banco pago_movil",
  );
  return service
    .addCuenta({ cuenta, banco, pago_movil })
    .then((data) => res.json(data));
}

export async function updateCuenta(req, res) {
  const { cuentaId } = req.params;
  const value = req.body;
  return service
    .updateCuenta({ cuentaId, value })
    .then((data) => res.json(data));
}

export async function deleteCuenta(req, res) {
  const { cuentaId } = req.params;
  return service.deleteCuenta(cuentaId).then((data) => res.json(data));
}
