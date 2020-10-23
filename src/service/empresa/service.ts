import { Empresa, Categoria } from "@models";
import { PasswordHelper, Socket } from "@utils";

export async function list({ ruta, ciudadId }) {
  const { _id: categoria } = await Categoria.findOne({ ruta }).lean();
  let query: any = { publish: 1, es_sucursal: 0, categoria };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
    .populate("categoria", "ruta")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .lean();
}

export async function listAll() {
  return Empresa.find({}).lean();
}

export async function listAllInfo({ empresaId, ciudadId }) {
  let query: any = { _id: empresaId };
  if (ciudadId) query = { ...query, ciudad: ciudadId };
  return Empresa.find(query)
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .lean();
}

export async function listHome({ type, ciudad, sort }) {
  let query: any = { es_sucursal: 0 };
  if (type === 3) query = { ...query, prueba: 1 };
  if (type === 1) query = { ...query, publish: 1 };
  if (ciudad) query = { ...query, ciudad };
  return Empresa.find(query)
    .populate("categoria", "ruta")
    .populate("ciudad", "nombre")
    .populate("estado", "nombre")
    .sort({ [sort]: -1 })
    .lean();
}

export async function listSucursales({ empresaId }) {
  return Empresa.findOne({ empresa: empresaId })
    .select("_id nombre principal")
    .lean();
}

export async function listOne({ field, value }) {
  return Empresa.findOne({ [field]: value }).lean();
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

/**
 * CONSULTAS PARA EL LOGIN
 */

export async function listOneEmpresaByField({ field, value }) {
  return Empresa.findOne({ [field]: value }).lean;
}

export async function updatePassword({ field, value, password }) {
  const hashPassword = PasswordHelper.hash(password);
  return Empresa.findOneAndUpdate(
    { [field]: value },
    { password: hashPassword },
    { new: true, lean: true },
  );
}
/**
 * FIN CONSULTAS DEL LOGIN
 */
export async function addEmpresa(value) {
  return Empresa.create(value);
}

export async function updateEmpresa({ empresaId, value }) {
  return Empresa.findOneAndUpdate({ _id: empresaId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteEmpresa(empresaId) {
  return Empresa.findOneAndDelete({ _id: empresaId });
}
