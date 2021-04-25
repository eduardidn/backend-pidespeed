"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
exports.default = {
    validate(object, fields) {
        const objectFields = Object.keys(object);
        const fieldsToVerify = fields.split(" ");
        for (const field of fieldsToVerify) {
            const found = objectFields.indexOf(field);
            if (found === -1)
                throw new _1.HTTP400Error(`Missing param ${field}`);
            if (object[field] === undefined)
                throw new _1.HTTP400Error(`Invalid param ${field}`);
        }
        return object;
    },
};
