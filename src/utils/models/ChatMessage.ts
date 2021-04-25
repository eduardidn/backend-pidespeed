import { Schema, model } from "mongoose";
import { Utils } from ".";

const schema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "sender is required"],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: [true, "receiver is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    status: {
      type: String,
      enum: ["sent", "receipt", "read"],
      required: true,
    },
    filename: String,
    mimeType: String,
    size: String,
    preview: String,
    forwarded: {
      type: Boolean,
      default: false,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
    archived: Boolean,
  },
  {
    timestamps: true,
    minimize: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    toObject: {
      virtuals: true,
    },
  },
);

export default model("chatMessage", Utils.prepare(schema));
