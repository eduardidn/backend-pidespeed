import { UploadImage, Empresa, Categoria, UsuarioEmpresa } from "../../utils";
import { addUsuario } from "../usuarioEmpresa/service";

export async function list({ ruta, ciudadId }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let query: any = { publish: true, es_sucursal: 0, categoria };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
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
}

export async function listAll() {
  const empresas = await Empresa.find({}).skip(1).limit(25).lean();
  for (const empresa of empresas) {
    UsuarioEmpresa.findOneAndUpdate(
      { _id: (empresa as any).usuario },
      {
        empresa: (empresa as any)._id,
      },
    ).exec();
  }
  return Empresa.find({})
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
}

export async function listAllInfo({ empresaId, ciudadId }) {
  let query: any = { _id: empresaId };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
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
}

export async function listHome({ tipo, ciudadId, sort }) {
  tipo = Number(tipo) === 1 ? true : false;
  let query: any = { es_sucursal: 0 };
  if (tipo === 3) query = { ...query, prueba: 1 };
  if (tipo) query = { ...query, publish: tipo };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
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
}

export async function listSucursales({ empresaId }) {
  return Empresa.findOne({ empresa: empresaId })
    .select("_id nombre principal")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function listOne({ field, value }) {
  return Empresa.findOne({ [field]: value })
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
