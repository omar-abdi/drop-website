import {Router} from "express";

import { createUser  , LoginUser } from "../controllers/Users.ts";

const router = Router();

router.post("/signup", createUser);
router.post("/login", LoginUser);


export default router;