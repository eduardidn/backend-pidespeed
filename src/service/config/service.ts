import { Config } from "../../utils";

export async function list() {
  return Config.find({})
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

export async function listOne() {
  return Config.findOne({})
    .sort({ _id: 1 })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addConfig(value) {
  return Config.create(value);
}

export async function updateConfig({ configId, value }) {
  return Config.findOneAndUpdate({ _id: configId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteConfig(configId) {
  return Config.findOneAndDelete({ _id: configId });
}
