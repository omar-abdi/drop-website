import type { Request, Response } from "express";
import Question from "../modals/questions.ts";

export const createQuestion = async (req: Request, res: Response) => {
  const { title, description, category, tags } = req.body;

  try {
    const question = await Question.create({
      title,
      description,
      category,
      tags,
      askedBy: (req as any).user._id,
    });

    res.status(201).json(question);
  } catch (error: any) {
    console.error("Error creating question:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};