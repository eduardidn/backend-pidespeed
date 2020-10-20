import * as service from "./service";

export async function importar(req, res) {
  return service.importar().then((data) => res.json(data));
}
