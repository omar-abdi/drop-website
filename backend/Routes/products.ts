import { Router } from "express";
import { createProduct , getAllProducts , getSingleProduct, updateProduct , deleteProduct } from "../controllers/products.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";
const router = Router();

router.post("/add",  protectRoute, createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;