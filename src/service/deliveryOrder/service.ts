import {
  HTTP400Error,
  DeliveryOrder,
  Empresa,
  DetallePedido,
  Clone,
  Socket,
} from "../../utils";
import { getDistance } from "../empresa/service";
const prices = [
  { metters: 5, price: 0.8 },
  { metters: 8, price: 1.6 },
];

export async function listDeliveryOrders({ companyId }) {
  const deliveryOrders: any = await DeliveryOrder.find({
    deliveryCompany: companyId,
  })
    .populate([
      {
        path: "assignedWorker",
        populate: { path: "img", select: "url" },
      },
      {
        path: "user",
        select: { nombre: 1, apellido: 1, email: 1, telefono1: 1, cedula: 1 },
      },
    ])
    .lean();
  await Promise.all(
    deliveryOrders.map(async (deliveryOrder) => {
      const orderDetails: any = await DetallePedido.find({
        pedido: deliveryOrder.order,
      }).lean();
      deliveryOrder.details = _detalleorders(orderDetails);
    }),
  );
  return deliveryOrders;
}

export async function listDeliveryOrder({ DeliveryOrderId }) {
  return DeliveryOrder.findOne({ _id: DeliveryOrderId }).populate("img").lean();
}

export async function getDeliveryPrice(empresas) {
  const companies = await _getCompanyCoords(empresas);
  const distance = await _getTotalDistance(companies, location);
  return _getPrice(distance);
}

export async function addDeliveryOrder(data: any) {
  const order = await DeliveryOrder.create(data);
  Socket.emitSocket("empresa", data.deliveryCompany, "new-order", order);
  return order;
}

export async function updateDeliveryOrder({ value }) {
  if (!value._id) throw new HTTP400Error("object need to have the _id");
  const DeliveryOrderId = value._id;
  delete value._id;
  return DeliveryOrder.findOneAndUpdate({ _id: DeliveryOrderId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteDeliveryOrder(DeliveryOrderId: any) {
  const DeliveryOrderObject: any = await DeliveryOrder.findOneAndDelete({
    _id: DeliveryOrderId,
  });
  return DeliveryOrderObject;
}

async function _getCompanyCoords(companiesIds) {
  return Promise.all(
    companiesIds.map(async (id) => ({
      id,
      coordinates: ((await Empresa.findOne({ _id: id }).select({
        coordenadas: 1,
      })) as any)?.coordenadas,
    })),
  );
}
async function _getTotalDistance(companies: any, uLocation: any) {
  let minorDistance: { id?: string; metters?: number; coordinates?: string } = {
    coordinates: uLocation,
  };
  const companiesArr = Clone(companies);
  let totalDistance = 0;
  for (const empresa of companies) {
    minorDistance = await _getMinorDistance(
      companiesArr,
      minorDistance.coordinates,
    );
    totalDistance += minorDistance.metters;
    removeItemFromArr(companiesArr, minorDistance.id);
  }
  return totalDistance;
}

async function _getMinorDistance(array: any, reference: string) {
  const distances = [];
  for (const { coordinates, id } of array) {
    distances.push({
      id,
      metters: await getDistance(coordinates, reference),
      coordinates,
    });
  }
  let min = distances[0];
  for (const companyData of distances)
    min = min.metters > companyData.metters ? companyData : min;
  return min;
}

const removeItemFromArr = (arr, id: string) => {
  for (const [index, value] of arr.entries())
    if (value.id === id) arr.splice(index, 1);
};

function _getPrice(distance) {
  return prices.find((price) => price.metters >= distance)?.price || 5;
}

// LOCAL FUNCTIONS
function _detalleorders(items) {
  return items.map((item) => {
    const details = [];
    details.push({
      nombre: item.nombre_producto,
      cantidad: item.cantidad,
    });
    if (item.acomp.sirope !== "vacio" && item.acomp.sirope) {
      if (item.acomp?.sirope?.length) {
        const nombres = [];
        item.acomp.sirope.map(({ nombre }) => nombres.push(nombre));
        details.push({ nombre: `Siropes: ${nombres.join(", ")}`, cost: "" });
      } else {
        const nombre = "Sirope: " + item.acomp.sirope.nombre;
        details.push({ nombre, cost: "" });
      }
    }

    if (item.acomp?.topping !== "vacio" && item.acomp?.topping) {
      if (item.acomp.topping.length) {
        const nombres = [];
        item.acomp.sirope.map(({ nombre }) => nombres.push(nombre));
        details.push({ nombre: `Toppings: ${nombres.join(", ")}`, cost: "" });
      } else {
        const nombre = "Toppings: " + item.acomp.topping.nombre;
        details.push({ nombre, cost: "" });
      }
    }

    if (item.acomp.bebida !== "vacio" && item.acomp.bebida) {
      if (item.acomp.bebida.length) {
        const nombres = [];
        item.acomp.bebida.map(({ nombre }) => nombres.push(nombre));
        details.push({ nombre: `Bebidas: ${nombres.join(", ")}`, cost: "" });
      } else {
        const nombre = "Bebida: " + item.acomp.bebida.nombre;
        details.push({ nombre, cost: "" });
      }
    }

    if (item.acomp.instrucciones !== "vacio" && item.acomp.instrucciones) {
      const nombre = `instrucciones: ${item.acomp.instrucciones}`;
      details.push({
        nombre,
        cost: "",
      });
    }

    if (item.add.adicional !== "vacio" && item.add.adicional) {
      if (item.add.adicional.length) {
        const nombres = [];
        const precio = 0;
        item.acomp.bebida.map(([{ nombre, precio }]) => {
          nombres.push(nombre);
          precio += Number(precio);
        });
        details.push({
          nombre: `Adicionales: ${nombres.join(", ")}`,
          cost: precio,
        });
      } else {
        const nombre = "Adicional: " + item.add.adicional.nombre;
        details.push({
          nombre,
          cost: item.add.adicional.precio,
        });
        details.push({
          nombre: "Precio del Producto",
          cost: item.precio_producto,
        });
      }
    }
    return details;
  });
}
/* async function _getDistance(eLocations, uLocation) {
  const eCoords = [];
  if(eLocations.length) {
    for (const eLocation of eLocations)
      eCoords.push(_parseCoordinates(eLocation));
  } else eCoords.push(_parseCoordinates(eLocations));
  const uCoord = _parseCoordinates(uLocation);
  return eCoords.length & uCoord.lat
    ? _getMettersDistance(uCoord, eCoords)
    : false;
}

function _parseCoordinates(coor) {
  const coordenadas = coor?.split(",");
  const lat = Number(coordenadas?.[0]?.substr(1));
  const lng = Number(coordenadas?.[1]?.substr(1)?.slice(0, -1));
  return lat & lng && { lat, lng };
} */
