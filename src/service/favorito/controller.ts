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

export async function verifyFavorito(req, res) {
  const { usuarioId, empresaId } = req.params;
  return service
    .verifyFavorito({ usuarioId, empresaId })
    .then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function addFavorito(req, res) {
  const { usuario, empresa, categoria } = Validator.validate(
    req.body,
    "usuario empresa categoria",
  );
  return service
    .addFavorito({ usuario, empresa, categoria })
    .then((data) => res.json(data));
}

export async function deleteFavorito(req, res) {
  const { favoritoId } = req.params;
  return service.deleteFavorito(favoritoId).then((data) => res.json(data));
}

export async function deleteFavoritoByUsuario(req, res) {
  const { usuarioId, empresaId } = req.params;
  return service
    .deleteFavoritoByUsuario({ usuarioId, empresaId })
    .then((data) => res.json(data));
}
