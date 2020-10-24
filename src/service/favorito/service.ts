import { Favorito, Categoria } from "@models";
import { Socket } from "@utils";

export async function list({ usuarioId }) {
  let favoritos = await Favorito.find({ usuario: usuarioId })
    .populate("empresa", null, { publish: 1 })
    .populate("categoria")
    .lean();

  favoritos = favoritos.filter((favorito) => favorito.empresa);
  return favoritos;
}

export async function listEsp({ usuarioId, ruta }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let favoritos = await Favorito.findOne({ usuario: usuarioId, categoria })
    .populate("empresa", null, { publish: 1 })
    .populate("categoria")
    .lean();

  favoritos = favoritos.filter((favorito) => favorito.empresa);
  return favoritos;
}

export async function listAll() {
  return Favorito.find({}).populate("empresa").populate("categoria").lean();
}

export async function listOne({ usuarioId, empresaId }) {
  return Favorito.findOne({ usuario: usuarioId, empresa: empresaId })
    .populate("empresa")
    .populate("categoria")
    .lean();
}

export async function addFavorito(value) {
  return Favorito.create(value);
}

export async function deleteFavorito(favoritoId) {
  return Favorito.findOneAndDelete({ _id: favoritoId });
}
