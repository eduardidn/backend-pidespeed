import { Empresa, Categoria } from "@models";

export async function list({ ruta, ciudadId }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let query: any = { publish: 1, es_sucursal: 0, categoria };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
    .populate("categoria", "ruta")
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
  return Empresa.find({})
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
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = { es_sucursal: 0 };
  if (tipo === 3) query = { ...query, prueba: 1 };
  if (tipo === 1) query = { ...query, publish: 1 };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
    .populate("categoria", "ruta")
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
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addVisita({ ruta }) {
  const empresa = await Empresa.findOne({ ruta }).select("visitas").exec();
  empresa.visitas = empresa.visitas + 1;
  empresa.save();
}

export async function addVenta({ ruta }) {
  const empresa = await Empresa.findOne({ ruta }).select("ventas").exec();
  empresa.ventas = empresa.ventas + 1;
  empresa.save();
}

export async function addEmpresa(value) {
  return Empresa.create(value);
}

export async function updateEmpresa({ empresaId, value }) {
  return Empresa.findOneAndUpdate({ _id: empresaId }, value, {
    new: true,
    lean: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteEmpresa(empresaId) {
  return Empresa.findOneAndDelete({ _id: empresaId });
}
