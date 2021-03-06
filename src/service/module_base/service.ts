import {
  Acomp,
  Adicional,
  Bebida,
  CategoriaProducto,
  File,
  DetallePedido,
  Empresa,
  Producto,
  Sabor,
  Sirope,
  Tamano,
  Topping,
  Usuario,
  UsuarioEmpresa,
  Zona,
  UploadImage,
} from "../../utils";
import fs from "fs";
import Axios from "axios";
import crypto from "crypto";

const BUCKETNAME = "pidespeed-storage";

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
  // await UploadImage.listFiles();
  /* let empresas = await Empresa.find({}).skip(17).limit(5).lean();
  for (let empresa of empresas) {
    if (filename != 'default-empresas.jpg') {
      await UploadImage.uploadTest(filename)
      let { _id: file } = await File.create({ url: empresa.img, type: 'empresa' })
      await Empresa.findOneAndUpdate({ _id: empresa._id }, { img: file }, { lean: true })
    }
  }
  return 'ok' */
  /* let files = await File.find().limit(15).sort({ _id: -1 }).lean()
  return files */
  /* const datos = await Empresa.find({}).skip(1).lean();
  for (let data of datos) {
    let logo = '5fa5b4bdb6dac50570af1a1b';
    let img = '5fa5b438e8a25c36c0fe1f52';
    if (data.logo === 'web/6.png') {
      await Empresa.findOneAndUpdate({ _id: data._id }, { logo, img }, {  new: true })
    }
  } */
  // return datos;
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
