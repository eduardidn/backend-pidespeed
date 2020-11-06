import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .post("/upload/public", CatchErrors(controller.uploadImagePublic))
  .post("/upload", CatchErrors(controller.uploadImage));
