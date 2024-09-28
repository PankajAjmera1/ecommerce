import {Router} from "express";
import { isLoggedIn ,authorize} from "../middlewares/auth.middleware.js";



const router = Router();

export default router;