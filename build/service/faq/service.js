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
exports.deleteFaq = exports.updateFaq = exports.addFaq = exports.listOne = exports.list = void 0;
const utils_1 = require("../../utils");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Faq.find({})
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
function listOne({ faqId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Faq.findOne({ _id: faqId })
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
function addFaq(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Faq.create(value);
    });
}
exports.addFaq = addFaq;
function updateFaq({ faqId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Faq.findOneAndUpdate({ _id: faqId }, value, {
            new: true,
        }).then((data) => {
            if (data) {
                data.id = data._id;
                return data;
            }
        });
    });
}
exports.updateFaq = updateFaq;
function deleteFaq(faqId) {
    return __awaiter(this, void 0, void 0, function* () {
        return utils_1.Faq.findOneAndDelete({ _id: faqId });
    });
}
exports.deleteFaq = deleteFaq;
