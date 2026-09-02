import {Router} from "express";

import { createUser } from "../controllers/Users.ts";

const router = Router();

router.post("/signup", createUser);


export default router;