"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Utils = __importStar(require("./utils"));
exports.Utils = Utils;
var Acomp_1 = require("./Acomp");
Object.defineProperty(exports, "Acomp", { enumerable: true, get: function () { return Acomp_1.default; } });
var Adicional_1 = require("./Adicional");
Object.defineProperty(exports, "Adicional", { enumerable: true, get: function () { return Adicional_1.default; } });
var Admin_1 = require("./Admin");
Object.defineProperty(exports, "Admin", { enumerable: true, get: function () { return Admin_1.default; } });
var CompanyPartner_1 = require("./CompanyPartner");
Object.defineProperty(exports, "CompanyPartner", { enumerable: true, get: function () { return CompanyPartner_1.default; } });
var Bebida_1 = require("./Bebida");
Object.defineProperty(exports, "Bebida", { enumerable: true, get: function () { return Bebida_1.default; } });
var Categoria_1 = require("./Categoria");
Object.defineProperty(exports, "Categoria", { enumerable: true, get: function () { return Categoria_1.default; } });
var CategoriaProducto_1 = require("./CategoriaProducto");
Object.defineProperty(exports, "CategoriaProducto", { enumerable: true, get: function () { return CategoriaProducto_1.default; } });
var ChatMessage_1 = require("./ChatMessage");
Object.defineProperty(exports, "ChatMessage", { enumerable: true, get: function () { return ChatMessage_1.default; } });
var Ciudad_1 = require("./Ciudad");
Object.defineProperty(exports, "Ciudad", { enumerable: true, get: function () { return Ciudad_1.default; } });
var Config_1 = require("./Config");
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return Config_1.default; } });
var Cuenta_1 = require("./Cuenta");
Object.defineProperty(exports, "Cuenta", { enumerable: true, get: function () { return Cuenta_1.default; } });
var DetallePedido_1 = require("./DetallePedido");
Object.defineProperty(exports, "DetallePedido", { enumerable: true, get: function () { return DetallePedido_1.default; } });
var DeliveryOrder_1 = require("./DeliveryOrder");
Object.defineProperty(exports, "DeliveryOrder", { enumerable: true, get: function () { return DeliveryOrder_1.default; } });
var Empresa_1 = require("./Empresa");
Object.defineProperty(exports, "Empresa", { enumerable: true, get: function () { return Empresa_1.default; } });
var EmpresaDelivery_1 = require("./EmpresaDelivery");
Object.defineProperty(exports, "EmpresaDelivery", { enumerable: true, get: function () { return EmpresaDelivery_1.default; } });
var EmpresaPedido_1 = require("./EmpresaPedido");
Object.defineProperty(exports, "EmpresaPedido", { enumerable: true, get: function () { return EmpresaPedido_1.default; } });
var Estado_1 = require("./Estado");
Object.defineProperty(exports, "Estado", { enumerable: true, get: function () { return Estado_1.default; } });
var Faq_1 = require("./Faq");
Object.defineProperty(exports, "Faq", { enumerable: true, get: function () { return Faq_1.default; } });
var Favorito_1 = require("./Favorito");
Object.defineProperty(exports, "Favorito", { enumerable: true, get: function () { return Favorito_1.default; } });
var File_1 = require("./File");
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return File_1.default; } });
var Pago_1 = require("./Pago");
Object.defineProperty(exports, "Pago", { enumerable: true, get: function () { return Pago_1.default; } });
var Pedido_1 = require("./Pedido");
Object.defineProperty(exports, "Pedido", { enumerable: true, get: function () { return Pedido_1.default; } });
var Producto_1 = require("./Producto");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return Producto_1.default; } });
var Role_1 = require("./Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return Role_1.default; } });
var Sabor_1 = require("./Sabor");
Object.defineProperty(exports, "Sabor", { enumerable: true, get: function () { return Sabor_1.default; } });
var Sirope_1 = require("./Sirope");
Object.defineProperty(exports, "Sirope", { enumerable: true, get: function () { return Sirope_1.default; } });
var Subcategoria_1 = require("./Subcategoria");
Object.defineProperty(exports, "Subcategoria", { enumerable: true, get: function () { return Subcategoria_1.default; } });
var Tamano_1 = require("./Tamano");
Object.defineProperty(exports, "Tamano", { enumerable: true, get: function () { return Tamano_1.default; } });
var TipoBebida_1 = require("./TipoBebida");
Object.defineProperty(exports, "TipoBebida", { enumerable: true, get: function () { return TipoBebida_1.default; } });
var Topping_1 = require("./Topping");
Object.defineProperty(exports, "Topping", { enumerable: true, get: function () { return Topping_1.default; } });
var Usuario_1 = require("./Usuario");
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return Usuario_1.default; } });
var UsuarioEmpresa_1 = require("./UsuarioEmpresa");
Object.defineProperty(exports, "UsuarioEmpresa", { enumerable: true, get: function () { return UsuarioEmpresa_1.default; } });
var Venta_1 = require("./Venta");
Object.defineProperty(exports, "Venta", { enumerable: true, get: function () { return Venta_1.default; } });
var Zona_1 = require("./Zona");
Object.defineProperty(exports, "Zona", { enumerable: true, get: function () { return Zona_1.default; } });
