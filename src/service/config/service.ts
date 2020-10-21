import { Config } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Config.find({}).lean();
}

export async function listOne({ configId }) {
  return Config.findOne({ _id: configId }).lean();
}

export async function addConfig(value) {
  return Config.create(value);
}

export async function updateConfig({ configId, value }) {
  return Config.findOneAndUpdate({ _id: configId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteConfig(configId) {
  return Config.findOneAndDelete({ _id: configId });
}
