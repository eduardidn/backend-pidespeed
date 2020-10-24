import { Validator } from "@utils";
import * as service from "./service";

export async function list(req, res) {
  const { usuarioId } = req.params;
  return service.list({ usuarioId }).then((data) => res.json(data));
}

export async function listEsp(req, res) {
  const { usuarioId, ruta } = req.params;
  return service.listEsp({ usuarioId, ruta }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { usuarioId, empresaId } = req.params;
  return service
    .listOne({ usuarioId, empresaId })
    .then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function addFavorito(req, res) {
  const { nombre } = Validator.validate(req.body, "nombre");
  return service.addFavorito({ nombre }).then((data) => res.json(data));
}

export async function deleteFavorito(req, res) {
  const { favoritoId } = req.params;
  return service.deleteFavorito(favoritoId).then((data) => res.json(data));
}
