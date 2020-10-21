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
exports.importar = void 0;
const _models_1 = require("@models");
const axios_1 = __importDefault(require("axios"));
function importar() {
    return __awaiter(this, void 0, void 0, function* () {
        const sabores = yield axios_1.default
            .get("http://localhost:3000/public/sabores/list/all/sabores")
            .then((sabores) => {
            return sabores.data;
        });
        for (const sabor of sabores) {
            const { _id: empresa } = yield _models_1.Empresa.findOne({
                prev_id: sabor.empresa_id,
            });
            delete sabor.empresa_id;
            sabor.empresa = empresa;
            sabor.prev_id = sabor.id;
            delete sabor.id;
            // console.log(sabor)
            yield _models_1.Sabor.create(sabor);
        }
        return "guardado";
    });
}
exports.importar = importar;
