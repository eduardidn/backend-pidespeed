import express from "express";

import { ErrorHandle } from "@middlewares";

//import { systemRoutes } from "./service/system";

export default async function (app) {
  const router = express
    .Router()

  app.use("/api", router).use(ErrorHandle);
  return app;
}
