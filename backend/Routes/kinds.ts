/// samey routes kinds 
//maya Router soo import garey 
import { Router } from "express";
import { createProductKinds, getAllKinds, getSingleKinds, updateProductKinds, deleteProductKinds } from "../controllers/kinds.ts";
//soo import gary 2daba protect iyo only admin ku xir delete update post 
import {adminRoute} from "../utillas/adminRoute.ts" 
import { protectRoute } from "../middaleware/protectRoute.ts";

const router = Router();

router.get("/", getAllKinds);
router.get("/:id", getSingleKinds);
router.post("/add",   protectRoute, adminRoute, createProductKinds);
router.put("/:id", protectRoute, adminRoute, updateProductKinds);
router.delete("/:id", protectRoute, adminRoute, deleteProductKinds);

export default router;