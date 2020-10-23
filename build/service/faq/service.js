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
const _models_1 = require("@models");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Faq.find({}).lean();
    });
}
exports.list = list;
function listOne({ faqId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Faq.findOne({ _id: faqId }).lean();
    });
}
exports.listOne = listOne;
function addFaq(value) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Faq.create(value);
    });
}
exports.addFaq = addFaq;
function updateFaq({ faqId, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Faq.findOneAndUpdate({ _id: faqId }, value, {
            new: true,
            lean: true,
        });
    });
}
exports.updateFaq = updateFaq;
function deleteFaq(faqId) {
    return __awaiter(this, void 0, void 0, function* () {
        return _models_1.Faq.findOneAndDelete({ _id: faqId });
    });
}
exports.deleteFaq = deleteFaq;
