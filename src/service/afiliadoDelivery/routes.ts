import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/:empresaId", CatchErrors(controller.listAfiliados))
  .get("/list/one/:AfiliadoId", CatchErrors(controller.listAfiliado))
  .post("/", CatchErrors(controller.addAfiliado))
  .put("/", CatchErrors(controller.updateAfiliado))
  .delete("/", CatchErrors(controller.deleteAfiliado));
