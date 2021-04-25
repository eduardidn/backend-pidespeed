import { ChatMessage, encrypt, decrypt, Socket } from "../../utils";

export async function sendMessage({
  userId,
  sender = "",
  receiver,
  type = "chat",
  content = "",
  mimeType = "plain/text",
  forwarded = false,
  replyTo,
  filename,
}: {
  userId: string;
  sender: string;
  receiver: string;
  type: string;
  content: string;
  mimeType: string;
  forwarded: boolean;
  replyTo: string;
  filename: string;
}) {
  if (!sender) sender = userId;
  const message = await ChatMessage.create({
    sender,
    receiver,
    type,
    content: encrypt(content, sender),
    mimeType: encrypt(mimeType, sender),
    filename: filename ? encrypt(filename, sender) : undefined,
    forwarded,
    replyTo,
  }).then((data: any) => {
    data.content = decrypt(data.content, data.sender);
    return data;
  });
  Socket.emitSocket("user", message.receiver, "message", {
    action: "new",
    object: message,
  });
  return message;
}

export async function deleteMessage(chatMessageId, userId) {
  const message: any = await ChatMessage.findOne({ _id: chatMessageId }).lean();
  if (String(message.sender) === userId) {
    await ChatMessage.findOneAndUpdate(
      { _id: chatMessageId },
      { archived: true },
    );
    message.archived = true;
    Socket.emitSocket("user", message.receiver, "message", {
      action: "delete",
      object: message,
    });
    return message;
  }
}
