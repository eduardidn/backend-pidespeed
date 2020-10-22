import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  return service.list().then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { faqId } = req.params;
  return service.listOne({ faqId }).then((data) => res.json(data));
}

export async function addFaq(req, res) {
  // const { nombre } = Validator.validate(req.body, "nombre");
  return service.addFaq(req.body).then((data) => res.json(data));
}

export async function updateFaq(req, res) {
  const { faqId } = req.params;
  const value = req.body;
  return service.updateFaq({ faqId, value }).then((data) => res.json(data));
}

export async function deleteFaq(req, res) {
  const { faqId } = req.params;
  return service.deleteFaq(faqId).then((data) => res.json(data));
}
