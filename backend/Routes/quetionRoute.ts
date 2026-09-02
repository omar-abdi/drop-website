import { Router } from "express";
import { createQuestion } from "../controllers/questions.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";
const router = Router();

router.post("/ask",  protectRoute, createQuestion);

export default router;