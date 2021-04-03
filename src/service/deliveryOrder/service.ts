import {
  HTTP400Error,
  DeliveryOrder,
  Empresa,
  Clone,
  Socket,
} from "../../utils";
import { getDistance } from "../empresa/service";
const prices = [
  { metters: 5, price: 0.8 },
  { metters: 8, price: 1.6 },
];

export function listDeliveryOrders({ empresaId }) {
  return DeliveryOrder.find({
    empresaDelivery: empresaId,
  })
    .populate("img")
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

export async function listDeliveryOrder({ DeliveryOrderId }) {
  return DeliveryOrder.findOne({ _id: DeliveryOrderId })
    .populate("img")
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function getDeliveryPrice(empresas) {
  const companies = await _getCompanyCoords(empresas);
  const distance = await _getTotalDistance(companies, location);
  return _getPrice(distance);
}

export async function addDeliveryOrder(data: any) {
  const order = await DeliveryOrder.create(data);
  Socket.emitSocket("empresa", "5fcd3afc64e32d421c2e579b", "new-order", order);
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
