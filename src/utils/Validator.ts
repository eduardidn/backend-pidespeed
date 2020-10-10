import { HTTP400Error } from "./";

export default {
  validate(object, fields) {
    const objectFields = Object.keys(object);
    const fieldsToVerify = fields.split(" ");
    for (const field of fieldsToVerify) {
      const found = objectFields.indexOf(field);
      if (found === -1) throw new HTTP400Error(`Missing param ${field}`);
      if (object[field] === undefined)
        throw new HTTP400Error(`Invalid param ${field}`);
    }
    return object;
  },
};
