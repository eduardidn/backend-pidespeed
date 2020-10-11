import express from "express";
import * as controller from "./controller";
import { CatchErrors } from "@utils";
export default express
  .Router()
  .get("/classes/:disciplineId/:value?", CatchErrors(controller.listClass))
  .get(
    "/class/notification/:value?",
    CatchErrors(controller.listClassForNotification),
  )
  .get("/class/history/:id", CatchErrors(controller.getClassHistory))
  .get("/class/:id", CatchErrors(controller.getClass))
  .get("/class/:owner", CatchErrors(controller.getClassByOwner))
  .get("/class/discipline/:id", CatchErrors(controller.getClassByOwner))

  .get("/class/members/:classId", CatchErrors(controller.getClassMembers))

  .get("/class/next/:memberId", CatchErrors(controller.nextClasses))

  .post("/class", CatchErrors(controller.createClass))
  .post(
    "/class/session/join/admin/:sessionId",
    CatchErrors(controller.joinSessionAsAdmin),
  )
  .post("/class/session/join/:sessionId", CatchErrors(controller.joinSession))
  .post("/class/session/close/:sessionId", CatchErrors(controller.closeSession))

  .post("/class/session/:classId", CatchErrors(controller.createSession))

  .patch("/class/:id/member", CatchErrors(controller.updateMembers))
  .patch("/class/:id", CatchErrors(controller.updateClass))
  .delete("/class/:id", CatchErrors(controller.deleteClass));
