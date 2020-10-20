import express from "express";

import { ErrorHandle } from "@middlewares";

import exampleRoutes from "./service/module_base";

export default async function (app) {
  const router = express.Router().use(exampleRoutes);

  app.use("/api", router).use(ErrorHandle);
  return app;
}
