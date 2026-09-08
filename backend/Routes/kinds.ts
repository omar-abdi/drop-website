/// samey routes kinds 
//maya Router soo import garey 
import { Router } from "express";
import { createProductKinds, getAllKinds, getSingleKinds, updateProductKinds, deleteProductKinds } from "../controllers/kinds.ts";
//soo import gary 2daba protect iyo only admin ku xir delete update post 

import { protect, onlyAdmin } from "../middleware/auth.ts";
const router = Router();

router.get("/", getAllKinds);
router.get("/:id", getSingleKinds);
router.post("/",  protect, onlyAdmin, createProductKinds);
router.put("/:id", protect, onlyAdmin, updateProductKinds);
router.delete("/:id", protect, onlyAdmin, deleteProductKinds);

export default router;