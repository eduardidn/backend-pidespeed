import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .get("/:usuarioId", CatchErrors(controller.list))
  .get("/list/all", CatchErrors(controller.listAll))
  .get("/list-one/:usuarioId/:empresaId", CatchErrors(controller.listOne))
  .get("/verify/:usuarioId/:empresaId", CatchErrors(controller.verifyFavorito))
  .get("/list-by-ruta/:usuarioId/:ruta", CatchErrors(controller.listEsp))
  .post("/", CatchErrors(controller.addFavorito))
  .delete("/:favoritoId", CatchErrors(controller.deleteFavorito))
  .delete(
    "/:usuarioId/:empresaId",
    CatchErrors(controller.deleteFavoritoByUsuario),
  );
