import winston, { format } from "winston";

const { combine } = format;

const winstonConfig = {
  level: "info",
  handleExceptions: true,
  format: combine(winston.format.colorize(), winston.format.simple()),
};

const transports = [new winston.transports.Console(winstonConfig)];

const logger = winston.createLogger({
  transports,
  exitOnError: false,
});

export default logger;
