import express from "express";
import { json, urlencoded } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import {
  UserTokenMiddleware,
  BusinessTokenMiddleware,
  AdminTokenMiddleware,
} from "./middlewares";
import fileUpload from "express-fileupload";
import http from "http";

import logger from "./logger";
import { io as socket } from "./Socket";
import tasaFunc from "./TasaFunctions";

const app = express();
const httpServer = http.createServer(app);

app
  .use(helmet())
  .use(cors())
  .use(
    json({
      limit: "20mb",
    }),
  )
  .use(
    urlencoded({
      extended: true,
      limit: "20mb",
    }),
  )
  .use(UserTokenMiddleware)
  // .use(BusinessTokenMiddleware)
  // .use(AdminTokenMiddleware)
  .use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
      tempFileDir: "./tmp/",
      preserveExtension: true,
    }),
  )
  .use(
    morgan("combined", {
      stream: {
        write: (info) => logger.info(info.trim()),
      },
      skip: (req, res) => req.method === "OPTIONS",
    }),
  )
  .set("trust proxy", true);

socket(httpServer);
tasaFunc.start();

const port = process.env.PORT || 5000;
httpServer.listen(port, () => logger.info(`Running on port ${port}`));

export default app;
