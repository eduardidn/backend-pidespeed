import mongooseLeanVirtuals from "mongoose-lean-virtuals";

export function prepare(schema) {
  schema.plugin(mongooseLeanVirtuals);
  return schema;
}
