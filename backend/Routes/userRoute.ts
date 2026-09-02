import {Router} from "express";

import { createUser  , LoginUser , logoutUser } from "../controllers/Users.ts";

const router = Router();

router.post("/signup", createUser);
router.post("/login", LoginUser);
router.post("/logout", logoutUser);


export default router;