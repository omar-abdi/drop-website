import mongoose, { Document, Schema } from "mongoose";

type IAnswer = {
  content: string;
  question: mongoose.Types.ObjectId;
  answeredBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new Schema<IAnswer>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    answeredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;