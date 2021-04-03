import { Socket, TokenUtils } from "@utils";
import cron from "node-cron";
import axios from "axios";
import {
  Empresa,
  Adicional,
  Producto,
  Config,
  EmpresaDelivery,
} from "./models";
class TasaFunc {
  public mes: any = 0;
  public token: any;

  start() {
    cron.schedule("*/30 * * * *", () => {
      this.revisarTasa();
    });
    // request Coords
    cron.schedule("*/5 * * * *", async () => {
      const companies = await EmpresaDelivery.find({}).select("_id").lean();
      await Promise.all(
        companies.map(({ _id }) =>
          Socket.emitSocket("empresa", _id, "renew-coords", {}),
        ),
      );
    });
    setTimeout(() => {
      this.revisarTasa();
    }, 15000);
  }

  public revisarTasa() {
    // verificar tasa dollar today
    axios
      .get("https://s3.amazonaws.com/dolartoday/data.json")
      .then(async (response: any) => {
        const tasaBCV = response.data.USD.promedio_real.toFixed();
        const tasaDT = response.data.USD.promedio.toFixed();

        // token para las consultas restringidas
        this.token = await TokenUtils.createUserToken({
          userId: { _id: 1234 },
        });
        this.cambiarTasaBCV(tasaBCV);
        this.cambiarTasaDT(tasaDT);
        await Config.findOneAndUpdate(
          {},
          { tasa_dt: tasaDT, tasa_bcv: tasaBCV },
        );
      });
  }

  public async cambiarTasaDT(tasaDT: any) {
    // buscar empresas con tasa de dolar today
    const empresas = await Empresa.find({ tasa_dt: 1 }).lean();

    // recorrer empresas
    empresas.map(async (empresa: any) => {
      if (empresa.tasa !== tasaDT) {
        this.actualizarAdicionales(tasaDT, empresa);
        this.actualizarProductos(tasaDT, empresa);
        await Empresa.findOneAndUpdate({ _id: empresa._id }, { tasa: tasaDT });
      }
    });
    // map de empresas
  }

  public async cambiarTasaBCV(tasaBCV: any) {
    // buscar empresas con tasa de dolar BCV
    const empresas = await Empresa.find({ tasa_bcv: 1 }).lean();
    // recorrer empresas
    empresas.map(async (empresa: any) => {
      if (empresa.tasa !== tasaBCV) {
        this.actualizarAdicionales(tasaBCV, empresa);
        this.actualizarProductos(tasaBCV, empresa);
        await Empresa.findOneAndUpdate({ _id: empresa._id }, { tasa: tasaBCV });
      }
    });
    // map de empresas
    // busqueda de empresas
  }

  // ACTUALIZAR ADICIONALES
  async actualizarAdicionales(tasa, empresa) {
    // buscar adicionales
    const adicionales = await Adicional.find({ empresa: empresa._id }).lean();
    // recorrer adicionales
    adicionales.forEach(async (adicional: any, index: any) => {
      let precioFinal1 = 0;

      if (adicional.precio$ !== 0) {
        let precioBs = Math.round(tasa * adicional.precio$);
        if (empresa.porcent_mas !== 0) {
          precioBs = Math.round(
            precioBs + (precioBs * empresa.porcent_mas) / 100,
          );
        }
        precioFinal1 = precioBs;
        if (empresa.redondear_precio === 1)
          precioFinal1 = this.redondearPrecio(precioBs);
      }

      if (precioFinal1 !== 0) {
        // actualizar precio de adicional
        await Adicional.findOneAndUpdate(
          { _id: adicional._id },
          { precio: precioFinal1 },
        );
      }
    });
    // foreach de adicionales
  }

  async actualizarProductos(tasa, empresa) {
    // busqueda de productos
    const productos = await Producto.find({ empresa: empresa._id }).lean();
    // recorrer productos
    productos.forEach(async (producto: any, index: any) => {
      let precioFinal1 = 0;
      let precioFinalToGo = 1;

      if (producto.precio1_dl !== 0) {
        let precioBs = Math.round(tasa * producto.precio1_dl);
        if (empresa.porcent_mas !== 0) {
          precioBs = Math.round(
            precioBs + (precioBs * empresa.porcent_mas) / 100,
          );
        }
        precioFinal1 = precioBs;
        if (empresa.redondear_precio === 1)
          precioFinal1 = this.redondearPrecio(precioBs);
      }

      if (producto.to_go > 1) {
        const precioBs = Math.round(tasa * producto.to_go$);
        precioFinalToGo = precioBs;
        if (empresa.redondear_precio === 1)
          precioFinalToGo = this.redondearPrecio(precioBs);
      } else if (producto.to_go === 0) {
        precioFinalToGo = 0;
      }

      // modificar precio de productos
      await Producto.findOneAndUpdate(
        { _id: producto._id },
        { precio1: precioFinal1, to_go: precioFinalToGo },
      );
    });
    // forech de productos
  }

  redondearPrecio(precioBs) {
    const precioBsString = precioBs.toString();
    let ultNums: any = precioBsString.substr(-3);
    let primNums = "";
    if (ultNums === "500") {
      return precioBs;
    } else {
      const longitud = precioBsString.length - 3;
      primNums = precioBsString.slice(0, longitud);
      ultNums = Number(ultNums);
      if (ultNums > 500) {
        primNums = (Number(primNums) + 1).toString();
        return Number(primNums + "000");
      } else {
        return Number(primNums + "000");
      }
    }
  }
}
const tasaFunc = new TasaFunc();
export default tasaFunc;
