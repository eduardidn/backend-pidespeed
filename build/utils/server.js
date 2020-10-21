"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const http_1 = __importDefault(require("http"));
const logger_1 = __importDefault(require("./logger"));
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
app
    .use(helmet_1.default())
    .use(cors_1.default())
    .use(body_parser_1.json({
    limit: "20mb",
}))
    .use(body_parser_1.urlencoded({
    extended: true,
    limit: "20mb",
}))
    // .use(UserTokenMiddleware)
    // .use(BusinessTokenMiddleware)
    // .use(AdminTokenMiddleware)
    .use(express_fileupload_1.default({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
    .use(morgan_1.default("combined", {
    stream: {
        write: (info) => logger_1.default.info(info.trim()),
    },
    skip: (req, res) => req.method === "OPTIONS",
}))
    .set("trust proxy", true);
// socket(httpServer);
const port = process.env.PORT || 5000;
httpServer.listen(port, () => logger_1.default.info(`Running on port ${port}`));
exports.default = app;