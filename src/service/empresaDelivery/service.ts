import { EmpresaDelivery, Categoria } from "@models";
import { addUsuario } from "../usuarioEmpresa/service";

export async function list({ ruta, ciudadId }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let query: any = { publish: 1, es_sucursal: 0, categoria };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return EmpresaDelivery.find(query)
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
  return EmpresaDelivery.find({})
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
  return EmpresaDelivery.find(query)
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
  tipo = Number(tipo) === 1 ? 1 : 0;
  let query: any = { es_sucursal: 0 };
  if (tipo === 3) query = { ...query, prueba: 1 };
  if (tipo === 1) query = { ...query, publish: 1 };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return EmpresaDelivery.find(query)
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
  return EmpresaDelivery.findOne({ empresa: empresaId })
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
  return EmpresaDelivery.findOne({ [field]: value })
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
  const empresa = await EmpresaDelivery.findOne({ ruta })
    .select("visitas")
    .exec();
  empresa.visitas = empresa.visitas + 1;
  empresa.save();
}

export async function addVenta({ ruta }) {
  const empresa = await EmpresaDelivery.findOne({ ruta })
    .select("ventas")
    .exec();
  empresa.ventas = empresa.ventas + 1;
  empresa.save();
}

export async function addEmpresa(value) {
  const empresa = await EmpresaDelivery.create(value);
  const {
    username,
    telefono,
    password,
    email,
    nombreUsuario,
    apellidoUsuario,
  } = value;
  const user = {
    empresaDelivery: empresa._id,
    username,
    password,
    telefono,
    email,
    type: "delivery",
    nombre: nombreUsuario,
    apellido: apellidoUsuario,
  };
  const usuario = await addUsuario(user);
  return { empresa, usuario };
}

export async function updateEmpresa({ empresaId, value }) {
  return EmpresaDelivery.findOneAndUpdate({ _id: empresaId }, value, {
    new: true,
    lean: true,
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
  return EmpresaDelivery.findOneAndDelete({ _id: empresaId });
}
