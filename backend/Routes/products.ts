import { Router } from "express";
import { createProduct , getAllProducts , getSingleProduct, updateProduct , deleteProduct } from "../controllers/products.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";

import {adminRoute} from "../utillas/adminRoute.ts" 
const router = Router();

router.post("/add",  protectRoute, adminRoute,  createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", protectRoute,  adminRoute, updateProduct);
router.delete("/:id", protectRoute,  adminRoute, deleteProduct);
 
export default router;