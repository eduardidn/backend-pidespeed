import { Favorito, Categoria } from "@models";
import { Socket } from "@utils";

export async function list({ usuarioId }) {
  let favoritos: any = await Favorito.find({ usuario: usuarioId })
    .populate("empresa", null, { publish: true }, { populate: "img logo" })
    .populate("categoria")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );

  favoritos = favoritos.filter((favorito: any) => favorito.empresa);
  return favoritos;
}

export async function listEsp({ usuarioId, ruta }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let favoritos: any = await Favorito.findOne({ usuario: usuarioId, categoria })
    .populate("empresa", null, { publish: true }, { populate: "img logo" })
    .populate("categoria")
    .lean()
    .then((data) => {
      data.id = data._id;
      return data;
    });

  favoritos = favoritos.filter((favorito) => favorito.empresa);
  return favoritos;
}

export async function listAll() {
  return Favorito.find({})
    .populate("empresa", { populate: "img logo" })
    .populate("categoria")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listOne({ usuarioId, empresaId }) {
  return Favorito.findOne({ usuario: usuarioId, empresa: empresaId })
    .populate("empresa", { populate: "img, logo" })
    .populate("categoria")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function verifyFavorito({ usuarioId, empresaId }) {
  return Favorito.countDocuments({
    usuario: usuarioId,
    empresa: empresaId,
  }).then((data) => data > 0);
}

export async function addFavorito(value) {
  return Favorito.create(value);
}

export async function deleteFavorito(favoritoId) {
  return Favorito.findOneAndDelete({ _id: favoritoId });
}

export async function deleteFavoritoByUsuario({ usuarioId, empresaId }) {
  return Favorito.findOneAndDelete({ usuario: usuarioId, empresa: empresaId });
}
