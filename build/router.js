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
const utils_1 = require("./utils");
const module_base_1 = __importDefault(require("./service/module_base"));
const acomp_1 = __importDefault(require("./service/acomp"));
const adicional_1 = __importDefault(require("./service/adicional"));
const companyPartner_1 = __importDefault(require("./service/companyPartner"));
const bebida_1 = __importDefault(require("./service/bebida"));
const categoriaProducto_1 = __importDefault(require("./service/categoriaProducto"));
const categoria_1 = __importDefault(require("./service/categoria"));
const ciudad_1 = __importDefault(require("./service/ciudad"));
const config_1 = __importDefault(require("./service/config"));
const cuenta_1 = __importDefault(require("./service/cuenta"));
const detallePedido_1 = __importDefault(require("./service/detallePedido"));
const deliveryOrder_1 = __importDefault(require("./service/deliveryOrder"));
const empresa_1 = __importDefault(require("./service/empresa"));
const empresaDelivery_1 = __importDefault(require("./service/empresaDelivery"));
const empresaPedido_1 = __importDefault(require("./service/empresaPedido"));
const estado_1 = __importDefault(require("./service/estado"));
const faq_1 = __importDefault(require("./service/faq"));
const favorito_1 = __importDefault(require("./service/favorito"));
const file_1 = __importDefault(require("./service/file"));
const login_1 = __importDefault(require("./service/login"));
const mail_1 = __importDefault(require("./service/mail"));
const pago_1 = __importDefault(require("./service/pago"));
const pedido_1 = __importDefault(require("./service/pedido"));
const producto_1 = __importDefault(require("./service/producto"));
const role_1 = __importDefault(require("./service/role"));
const sabor_1 = __importDefault(require("./service/sabor"));
const sirope_1 = __importDefault(require("./service/sirope"));
const tamano_1 = __importDefault(require("./service/tamano"));
const tipoBebida_1 = __importDefault(require("./service/tipoBebida"));
const topping_1 = __importDefault(require("./service/topping"));
const usuario_1 = __importDefault(require("./service/usuario"));
const usuarioEmpresa_1 = __importDefault(require("./service/usuarioEmpresa"));
const venta_1 = __importDefault(require("./service/venta"));
const zona_1 = __importDefault(require("./service/zona"));
function default_1(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const router = express_1.default
            .Router()
            .use(acomp_1.default)
            .use(adicional_1.default)
            .use(companyPartner_1.default)
            .use(bebida_1.default)
            .use(categoriaProducto_1.default)
            .use(categoria_1.default)
            .use(ciudad_1.default)
            .use(config_1.default)
            .use(cuenta_1.default)
            .use(detallePedido_1.default)
            .use(deliveryOrder_1.default)
            .use(empresa_1.default)
            .use(empresaDelivery_1.default)
            .use(empresaPedido_1.default)
            .use(estado_1.default)
            .use(faq_1.default)
            .use(favorito_1.default)
            .use(file_1.default)
            .use(login_1.default)
            .use(mail_1.default)
            .use(pago_1.default)
            .use(pedido_1.default)
            .use(producto_1.default)
            .use(role_1.default)
            .use(sabor_1.default)
            .use(sirope_1.default)
            .use(tamano_1.default)
            .use(tipoBebida_1.default)
            .use(topping_1.default)
            .use(usuario_1.default)
            .use(usuarioEmpresa_1.default)
            .use(venta_1.default)
            .use(zona_1.default)
            .use(module_base_1.default);
        app.use("/api", router).use(utils_1.ErrorHandle);
        return app;
    });
}
exports.default = default_1;
