import {Router} from "express";

import { createUser  , LoginUser , logoutUser  , getAllUsers  , deleteUserById , updateUserById, getCurrentUser } from "../controllers/Users.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";
import {adminRoute} from "../utillas/adminRoute.ts" 
const router = Router();

router.post("/signup", createUser);
router.post("/login", LoginUser);
router.get("/me", protectRoute, getCurrentUser);
router.post("/logout", logoutUser);
router.get("/all", protectRoute ,  adminRoute,      getAllUsers);
router.delete("/:id", protectRoute , adminRoute , deleteUserById);
router.put("/:id", protectRoute , adminRoute , updateUserById);


export default router;