import { Faq } from "@models";
import { Socket } from "@utils";

export async function list() {
  return Faq.find({}).lean();
}

export async function listOne({ faqId }) {
  return Faq.findOne({ _id: faqId }).lean();
}

export async function addFaq(value) {
  return Faq.create(value);
}

export async function updateFaq({ faqId, value }) {
  return Faq.findOneAndUpdate({ _id: faqId }, value, {
    new: true,
    lean: true,
  });
}

export async function deleteFaq(faqId) {
  return Faq.findOneAndDelete({ _id: faqId });
}
