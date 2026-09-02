import {Router} from "express";

import { createUser  , LoginUser , logoutUser  , getAllUsers } from "../controllers/Users.ts";
import { protectRoute } from "../middaleware/protectRoute.ts";
import {adminRoute} from "../utillas/adminRoute.ts" 
const router = Router();

router.post("/signup", createUser);
router.post("/login", LoginUser);
router.post("/logout", logoutUser);
router.get("/all", protectRoute ,  adminRoute,      getAllUsers);


export default router;