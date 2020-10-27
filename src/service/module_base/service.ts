import {
  Acomp,
  Adicional,
  Bebida,
  CategoriaProducto,
  DetallePedido,
  Empresa,
  Producto,
  Sabor,
  Sirope,
  Tamano,
  Topping,
  Usuario,
  Zona,
} from "@models";
import {} from "@utils";

const tablas = {
  acomp: Acomp,
  adicional: Adicional,
  bebida: Bebida,
  topping: Topping,
  sirope: Sirope,
  sabor: Sabor,
  tamano: Tamano,
  zona: Zona,
  categoriaProducto: CategoriaProducto,
};

export async function importar() {
  const datos = await Empresa.find({}).skip(1).lean();
  /* for (let data of datos) {
    let { contacto } = data;
    if (contacto == "") contacto = {}
    else contacto = JSON.parse(contacto)
    await Empresa.findOneAndUpdate({ _id: data._id }, { contacto }, { lean: true, new: true })
  } */
  return datos;
}

function isJsonString(str) {
  try {
    str = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

async function obtenerIdsAcomp({ valor, consulta }) {
  valor = valor.split(",");
  const response = await tablas[consulta]
    .find({ prev_id: { $in: valor } })
    .select("_id")
    .lean();
  let value = "";
  response.map((valor, index) => {
    if (index === response.length - 1) {
      value += valor._id;
    } else {
      value += valor._id + ",";
    }
  });
  return value;
}

async function obtenerIds({ valor, consulta }) {
  for (const val of valor) {
    const { _id: id } = await tablas[consulta]
      .findOne({ prev_id: val.id })
      .select("_id")
      .lean();
    val.id = id;
  }
  return valor;
}
