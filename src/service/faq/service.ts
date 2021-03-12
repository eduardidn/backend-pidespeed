import { Faq } from "../../utils";

export async function list() {
  return Faq.find({})
    .lean()
    .then((datos) =>
      datos.map((data) => {
        if (data) {
          data.id = data._id;
          return data;
        }
      }),
    );
}

export async function listOne({ faqId }) {
  return Faq.findOne({ _id: faqId })
    .lean()
    .then((data) => {
      if (data) {
        data.id = data._id;
        return data;
      }
    });
}

export async function addFaq(value) {
  return Faq.create(value);
}

export async function updateFaq({ faqId, value }) {
  return Faq.findOneAndUpdate({ _id: faqId }, value, {
    new: true,
  }).then((data) => {
    if (data) {
      data.id = data._id;
      return data;
    }
  });
}

export async function deleteFaq(faqId) {
  return Faq.findOneAndDelete({ _id: faqId });
}
