"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
exports.default = {
    clientError(err, req, res, next) {
        res.status(err.statusCode).json({ message: err.message || err });
    },
    serverError(err, req, res, next) {
        const message = err.stack ? `\n ${err.stack}` : ` - ${err}`;
        __1.logger.error(`${new Date()} - ${req.method} - ${req.url} ${message}`);
        res.status(500).json({ message: err.message || err });
    },
};
