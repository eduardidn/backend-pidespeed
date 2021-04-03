import { UploadImage, Empresa, Categoria, UsuarioEmpresa } from "../../utils";
import { addUsuario } from "../usuarioEmpresa/service";
import { Client } from "@googlemaps/google-maps-services-js";

export async function list({ ruta, ciudadId, coordenadas }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let query: any = { publish: false, es_sucursal: 0, categoria, prueba: 1 };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  const empresas: any = await Empresa.find(query)
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
  return coordenadas
    ? Promise.all(
        empresas.map(async (empresa) => {
          empresa.distance = await getDistance(empresa.coordenadas, "");
          return empresa;
        }),
      )
    : empresas;
}

export async function listAll(coordenadas) {
  const empresas: any = await Empresa.find({})
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );

  return coordenadas
    ? Promise.all(
        empresas.map(async (empresa) => {
          empresa.distance = await getDistance(empresa.coordenadas, "");
          return empresa;
        }),
      )
    : empresas;
}

export async function listAllInfo({ empresaId, ciudadId, coordenadas }) {
  let query: any = { _id: empresaId };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  const empresas: any = await Empresa.find(query)
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
  return coordenadas
    ? Promise.all(
        empresas.map(async (empresa) => {
          empresa.distance = await getDistance(empresa.coordenadas, "");
          return empresa;
        }),
      )
    : empresas;
}

export async function listHome({ tipo, ciudadId, sort, coordenadas }) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = { es_sucursal: 0 };
  if (tipo === 3) query = { ...query, prueba: 1 };
  if (tipo) query = { ...query, publish: tipo };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  const empresas: any = await Empresa.find(query)
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .sort({ [sort]: -1 })
    .lean()
    .then((datos) =>
      datos.map((data) => {
        data.id = data._id;
        return data;
      }),
    );
  return coordenadas
    ? Promise.all(
        empresas.map(async (empresa) => {
          empresa.distance = await getDistance(empresa.coordenadas, "");
          return empresa;
        }),
      )
    : empresas;
}

export async function listSucursales({ empresaId, coordenadas }) {
  const empresas: any = await Empresa.findOne({ empresa: empresaId })
    .select("_id nombre principal")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  return coordenadas
    ? Promise.all(
        empresas.map(async (empresa) => {
          empresa.distance = await getDistance(empresa.coordenadas, "");
          return empresa;
        }),
      )
    : empresas;
}

export async function listOne({ field, value }) {
  const empresa: any = await Empresa.findOne({ [field]: value })
    .lean()
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
  empresa.distance = await getDistance(empresa.coordenadas, "");
  return empresa;
}

export async function addVisita({ ruta }) {
  const empresa: any = await Empresa.findOne({ ruta }).select("visitas").exec();
  empresa.visitas = empresa.visitas + 1;
  empresa.save();
}

export async function addVenta({ ruta }) {
  const empresa: any = await Empresa.findOne({ ruta }).select("ventas").exec();
  empresa.ventas = empresa.ventas + 1;
  empresa.save();
}

export async function addEmpresa(value) {
  const empresa = await Empresa.create(value);
  const { username, telefono, password, email } = value;
  const user = {
    empresa: (empresa as any)._id,
    username,
    password,
    telefono,
    email,
    type: "empresa",
  };
  const usuario = await addUsuario(user);
  return { empresa, usuario };
}

export async function updateEmpresa({ empresaId, value }) {
  return Empresa.findOneAndUpdate({ _id: empresaId }, value, {
    new: true,
  })
    .populate("categoria", "ruta")
    .populate("logo", "url")
    .populate("img", "url")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function deleteEmpresa(empresaId) {
  const empresa: any = await Empresa.findOneAndDelete({ _id: empresaId });
  if (empresa.logo !== "5fa5b4bdb6dac50570af1a1b")
    await UploadImage.deleteImage(empresa.img);
  if (empresa.logo !== "5fa5b438e8a25c36c0fe1f52")
    await UploadImage.deleteImage(empresa.img);
  empresa.delete();
  return empresa;
}

export async function getDistance(eCoordenadas, uLocation) {
  const eCoor = eCoordenadas ? _parseCoordinates(eCoordenadas) : null;
  const uCoor = _parseCoordinates(uLocation);
  return eCoor?.lat & uCoor?.lat ? _getMettersDistance(eCoor, uCoor) : false;
}

function _parseCoordinates(coor) {
  const coordenadas = coor?.split(",");
  const lat = Number(coordenadas?.[0]?.substr(1));
  const lng = Number(coordenadas?.[1]?.substr(1)?.slice(0, -1));
  return lat & lng && { lat, lng };
}

async function _getMettersDistance(origin, uLocation) {
  const client = new Client({});
  const distance = (
    await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [uLocation],
        key: process.env.GOOGLE_KEY,
      },
    })
  ).data?.rows?.[0]?.elements?.[0]?.distance?.text;
  let metters = Number(distance?.split(" ")[0]);
  if (!(distance as any)?.includes("km") && metters) metters = metters / 1000;
  return metters;
}
