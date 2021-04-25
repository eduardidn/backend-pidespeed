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
// tslint:disable-next-line: no-var-requires
require("dotenv").config();
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    "@utils": `${__dirname}/utils`,
    "@models": `${__dirname}/utils/models`,
    "@": `${__dirname}/*`,
});
module_alias_1.default();
const index_1 = require("./utils/index");
const router_1 = __importDefault(require("./router"));
const MongoDB_1 = __importDefault(require("./utils/MongoDB"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield MongoDB_1.default.connect(process.pid.toString());
        router_1.default(index_1.app);
    });
})();
