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
const express_1 = __importDefault(require("express"));
const _middlewares_1 = require("@middlewares");
const module_base_1 = __importDefault(require("./service/module_base"));
const acomp_1 = __importDefault(require("./service/acomp"));
const adicional_1 = __importDefault(require("./service/adicional"));
const bebida_1 = __importDefault(require("./service/bebida"));
const categoriaProducto_1 = __importDefault(require("./service/categoriaProducto"));
const categoria_1 = __importDefault(require("./service/categoria"));
const ciudad_1 = __importDefault(require("./service/ciudad"));
const config_1 = __importDefault(require("./service/config"));
const cuenta_1 = __importDefault(require("./service/cuenta"));
const detallePedido_1 = __importDefault(require("./service/detallePedido"));
const empresaPedido_1 = __importDefault(require("./service/empresaPedido"));
const estado_1 = __importDefault(require("./service/estado"));
const faq_1 = __importDefault(require("./service/faq"));
const mail_1 = __importDefault(require("./service/mail"));
const pago_1 = __importDefault(require("./service/pago"));
const sabor_1 = __importDefault(require("./service/sabor"));
const sirope_1 = __importDefault(require("./service/sirope"));
const tipoBebida_1 = __importDefault(require("./service/tipoBebida"));
function default_1(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const router = express_1.default
            .Router()
            .use(acomp_1.default)
            .use(adicional_1.default)
            .use(bebida_1.default)
            .use(categoriaProducto_1.default)
            .use(categoria_1.default)
            .use(ciudad_1.default)
            .use(config_1.default)
            .use(cuenta_1.default)
            .use(detallePedido_1.default)
            .use(empresaPedido_1.default)
            .use(estado_1.default)
            .use(faq_1.default)
            .use(mail_1.default)
            .use(pago_1.default)
            .use(sabor_1.default)
            .use(sirope_1.default)
            .use(tipoBebida_1.default)
            .use(module_base_1.default);
        app.use("/api", router).use(_middlewares_1.ErrorHandle);
        return app;
    });
}
exports.default = default_1;
