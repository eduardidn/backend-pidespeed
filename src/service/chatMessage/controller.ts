import { Validator } from "../../utils";
import * as service from "./service";

export async function sendMessage(req, res) {
  const { userId } = req.user;
  const {
    sender,
    receiver,
    type,
    content,
    mimeType,
    forwarded,
    replyTo,
    filename,
  } = Validator.validate(req.body, "receiver content");
  return service
    .sendMessage({
      userId,
      sender,
      receiver,
      type,
      content,
      mimeType,
      forwarded,
      replyTo,
      filename,
    })
    .then((data) => res.json(data));
}

export async function deleteMessage(req, res) {
  const {
    params: { chatMessageId },
    user: { userId },
  } = req;
  return service
    .deleteMessage(chatMessageId, userId)
    .then((data) => res.json(data));
}
