import { Router } from "express";
import { createProduct } from "../controllers/products.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";
const router = Router();

router.post("/add",  protectRoute, createProduct);

export default router;