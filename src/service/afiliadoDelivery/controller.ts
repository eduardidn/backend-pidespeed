import * as service from "./service";

export async function listAfiliados(req, res) {
  return service.listAfiliados(req.params).then((data) => res.json(data));
}

export async function listAfiliado(req, res) {
  return service.listAfiliado(req.params).then((data) => res.json(data));
}

export async function addAfiliado(req, res) {
  return service.addAfiliado(req.body).then((data) => res.json(data));
}

export async function updateAfiliado(req, res) {
  const { AfiliadoId } = req.user;
  const value = req.body;
  return service
    .updateAfiliado({ AfiliadoId, value })
    .then((data) => res.json(data));
}

export async function deleteAfiliado(req, res) {
  const { AfiliadoId } = req.body;
  return service.deleteAfiliado(AfiliadoId).then((data) => res.json(data));
}
