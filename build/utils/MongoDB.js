"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
exports.default = {
    connect(pid = "Not informed") {
        return __awaiter(this, void 0, void 0, function* () {
            const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB } = process.env;
            const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
            const config = {
                url,
                params: {
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    keepAlive: true,
                    keepAliveInitialDelay: 300000,
                },
            };
            function setRunValidators() {
                this.setOptions({ runValidators: true });
            }
            mongoose_1.default.plugin((schema) => {
                schema.pre("findOneAndUpdate", setRunValidators);
                schema.pre("updateMany", setRunValidators);
                schema.pre("updateOne", setRunValidators);
                schema.pre("update", setRunValidators);
            });
            mongoose_1.default.connect(config.url, config.params);
            mongoose_1.default.connection.on("connected", () => logger_1.default.info(`Connected ${MONGO_DB}@${MONGO_HOST} on PID ${pid}`));
            mongoose_1.default.connection.on("disconneected", () => {
                logger_1.default.warn(`Disconnected from ${MONGO_HOST}`);
                logger_1.default.warn(`Trying to reconnect ${MONGO_DB}@${MONGO_HOST}`);
                setTimeout(() => mongoose_1.default.connect(config.url, config.params), 5000);
            });
            mongoose_1.default.connection.on("error", (error) => logger_1.default.error(`Error on MongoDb Connection ${MONGO_DB}@${MONGO_HOST}: ${error.message}`));
            mongoose_1.default.connection.on("reconnected", () => logger_1.default.info(`Successfully reconnected ${MONGO_DB}@${MONGO_HOST} on PID ${pid}`));
            process.on("SIGINT", () => mongoose_1.default.connection.close(() => {
                logger_1.default.warn(`MongoDb disconeted ${MONGO_DB}@${MONGO_HOST} by the end of service`);
                process.exit(0);
            }));
        });
    },
};
