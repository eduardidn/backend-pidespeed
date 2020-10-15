import {
  Bebida,
  Categoria,
  CategoriaProducto,
  Empresa,
  Favorito,
  Sabor,
  TipoBebida,
  Usuario,
} from "@models";
import {} from "@utils";
import axios from "axios";

export async function importar() {
  const sabores = await axios
    .get("http://localhost:3000/public/sabores/list/all/sabores")
    .then((sabores: any) => {
      return sabores.data;
    });

  for (const sabor of sabores) {
    const { _id: empresa } = await Empresa.findOne({
      prev_id: sabor.empresa_id,
    });
    delete sabor.empresa_id;
    sabor.empresa = empresa;
    sabor.prev_id = sabor.id;
    delete sabor.id;
    // console.log(sabor)
    await Sabor.create(sabor);
  }
  return "guardado";
}
