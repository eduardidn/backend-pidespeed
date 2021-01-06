import * as service from "./service";

export async function list(req, res) {
  const { ruta, ciudadId } = req.params;
  return service.list({ ruta, ciudadId }).then((data) => res.json(data));
}

export async function listAll(req, res) {
  return service.listAll().then((data) => res.json(data));
}

export async function listAllInfo(req, res) {
  const { empresaId, ciudadId } = req.params;
  return service
    .listAllInfo({ empresaId, ciudadId })
    .then((data) => res.json(data));
}

export async function listHome(req, res) {
  const { tipo, sort, ciudadId } = req.params;
  return service
    .listHome({ tipo, ciudadId, sort })
    .then((data) => res.json(data));
}

export async function listSucursales(req, res) {
  const { empresaId } = req.params;
  return service.listSucursales({ empresaId }).then((data) => res.json(data));
}

export async function listOne(req, res) {
  const { field, value } = req.params;
  return service.listOne({ field, value }).then((data) => res.json(data));
}

export async function addVisita(req, res) {
  const { ruta } = req.params;
  return service.addVisita({ ruta }).then((data) => res.json(data));
}

export async function addVenta(req, res) {
  const { ruta } = req.params;
  return service.addVenta({ ruta }).then((data) => res.json(data));
}

export async function addEmpresa(req, res) {
  return service.addEmpresa(req.body).then((data) => res.json(data));
}

export async function updateEmpresa(req, res) {
  const { empresaId } = req.params;
  const value = req.body;
  return service
    .updateEmpresa({ empresaId, value })
    .then((data) => res.json(data));
}

export async function deleteEmpresa(req, res) {
  const { empresaId } = req.params;
  return service.deleteEmpresa(empresaId).then((data) => res.json(data));
}
