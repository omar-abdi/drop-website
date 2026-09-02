import mongoose, { Document, Schema } from "mongoose";

type IQuestion = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  askedBy: mongoose.Types.ObjectId;
  acceptedAnswer: mongoose.Types.ObjectId | null;
  status: "open" | "solved";
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    askedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    acceptedAnswer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      default: null,
    },

    status: {
      type: String,
      enum: ["open", "solved"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;