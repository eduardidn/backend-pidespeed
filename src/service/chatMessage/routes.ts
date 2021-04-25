import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "../../utils";
export default express
  .Router()
  .post("/", CatchErrors(controller.sendMessage))
  .delete("/:chatMessageId", CatchErrors(controller.deleteMessage));
