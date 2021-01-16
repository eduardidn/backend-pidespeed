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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.addProducto = exports.listOne = exports.restarCantidad = exports.listOneByDatos = exports.listByIds = exports.listCatEsp = exports.list = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
function list({ tipo, ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: empresa } = yield _models_1.Empresa.findOne({ ruta }).lean();
        tipo = Number(tipo) === 1 ? true : false;
        let query = {
            empresa,
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Producto.find(query)
            .populate("file", "url")
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.list = list;
function listCatEsp({ tipo, ruta }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: empresa } = yield _models_1.Empresa.findOne({ ruta }).lean();
        tipo = Number(tipo) === 1 ? true : false;
        let query = {
            empresa,
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        let categorias = yield _models_1.Producto.find(query)
            .select("categoria_product")
            .populate("categoria_product", "nombre")
            .sort({ categoria_product: 1 })
            .lean();
        categorias = categorias.map((categoria) => {
            categoria.categoria_product.id = categoria.categoria_product._id;
            return categoria.categoria_product;
        });
        const hash = {};
        categorias = categorias.filter((categoria) => {
            const exists = !hash[categoria._id];
            hash[categoria._id] = true;
            return exists;
        });
        return categorias;
    });
}
exports.listCatEsp = listCatEsp;
function listByIds({ tipo, ids }) {
    return __awaiter(this, void 0, void 0, function* () {
        tipo = Number(tipo) === 1 ? true : false;
        ids = ids.split(",");
        let query = {
            _id: { $in: ids },
        };
        if (tipo)
            query = Object.assign(Object.assign({}, query), { publish: tipo });
        return _models_1.Producto.find(query)
            .lean()
            .then((datos) => datos.map((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        }));
    });
}
exports.listByIds = listByIds;
function listOneByDatos({ nombre, descripcion }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Producto.findOne({ nombre, descripcion })
            .populate("file", "url")
            .lean()
            .then((data) => {
            data.id = data._id;
            return data;
        });
    });
}
exports.listOneByDatos = listOneByDatos;
function restarCantidad({ productoId, cantidad }) {
    return __awaiter(this, void 0, void 0, function* () {
        const producto = yield _models_1.Producto.findOne({ _id: productoId })
            .select("cantidad")
            .exec();
        producto.cantidad = producto.cantidad - Number(cantidad);
        producto.save();
    });
}
exports.restarCantidad = restarCantidad;
function listOne({ productoId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Producto.findOne({ _id: productoId })
            .populate("file", "url")
            .populate("categoria_product")
            .lean()
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.listOne = listOne;
function addProducto(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Producto.create(value);
    });
}
exports.addProducto = addProducto;
function updateProducto({ productoId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Producto.findOneAndUpdate({ _id: productoId }, value, {
            new: true,
            lean: true,
        })
            .populate("file", "url")
            .then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateProducto = updateProducto;
function deleteProducto(productoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const producto = yield _models_1.Producto.findOneAndDelete({ _id: productoId });
        yield _utils_1.UploadImage.deleteImage(producto.file);
        return producto;
    });
}
exports.deleteProducto = deleteProducto;
