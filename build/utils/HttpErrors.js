"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP409Error = exports.HTTP406Error = exports.HTTP404Error = exports.HTTP403Error = exports.HTTP401Error = exports.HTTP400Error = exports.HTTPClientError = void 0;
class HTTPClientError extends Error {
    constructor(message) {
        if (message instanceof Error) {
            super(message.message);
            this.stack = message.stack;
        }
        else {
            if (message instanceof Object) {
                super(JSON.stringify(message));
            }
            else {
                super(message);
            }
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
        // this.statusCode = this.constructor.statusCode;
    }
}
exports.HTTPClientError = HTTPClientError;
class HTTP400Error extends HTTPClientError {
    constructor(message = "Bad Request") {
        super(message);
        this.statusCode = 400;
    }
}
exports.HTTP400Error = HTTP400Error;
class HTTP401Error extends HTTPClientError {
    constructor(message = "Unauthorized") {
        super(message);
        this.statusCode = 401;
    }
}
exports.HTTP401Error = HTTP401Error;
class HTTP403Error extends HTTPClientError {
    constructor(message = "Forbidden") {
        super(message);
        this.statusCode = 403;
    }
}
exports.HTTP403Error = HTTP403Error;
class HTTP404Error extends HTTPClientError {
    constructor(message = "Record not found") {
        super(message);
        this.statusCode = 404;
    }
}
exports.HTTP404Error = HTTP404Error;
class HTTP406Error extends HTTPClientError {
    constructor(message = "SyntaxError") {
        super(message);
        this.statusCode = 406;
    }
}
exports.HTTP406Error = HTTP406Error;
class HTTP409Error extends HTTPClientError {
    constructor(message = "Conflict") {
        super(message);
        this.statusCode = 409;
    }
}
exports.HTTP409Error = HTTP409Error;
