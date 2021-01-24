import * as service from "./service";

export async function listPartners(req, res) {
  return service.listPartners(req.params).then((data) => res.json(data));
}

export async function listPartner(req, res) {
  return service.listPartner(req.params).then((data) => res.json(data));
}

export async function addPartner(req, res) {
  return service.addPartner(req.body).then((data) => res.json(data));
}

export async function updatePartner(req, res) {
  const { partnerId } = req.user;
  const value = req.body;
  return service
    .updatePartner({ partnerId, value })
    .then((data) => res.json(data));
}

export async function deletePartner(req, res) {
  const { partnerId } = req.body;
  return service.deletePartner(partnerId).then((data) => res.json(data));
}
