import { Validator } from "../../utils";
import * as service from "./service";

export async function listPartners(req, res) {
  return service.listPartners(req.params).then((data) => res.json(data));
}

export async function listPartner(req, res) {
  return service.listPartner(req.params).then((data) => res.json(data));
}

export async function listPartnerByField(req, res) {
  const { field, value } = Validator.validate(req.body, "field value");
  return service
    .listPartnerByField({ field, value })
    .then((data) => res.json(data));
}

export async function addPartner(req, res) {
  return service.addPartner(req.body).then((data) => res.json(data));
}

export async function updatePartner(req, res) {
  const value = req.body;
  return service.updatePartner({ value }).then((data) => res.json(data));
}

export async function deletePartner(req, res) {
  const { partnerId } = req.body;
  return service.deletePartner(partnerId).then((data) => res.json(data));
}
