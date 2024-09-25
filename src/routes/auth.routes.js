import {Router} from "express";
import {  isLoggedIn } from "../middlewares/auth.middleware.js";
// import { authorize, isLoggedIn } from "../middlewares/auth.middleware";
// import AuthRoles from "../utils/authRoles";

import {signUp,login,logout,getProfile, forgotPassword} from "../controllers/auth.controller.js"

const router = Router();

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)
router.get("/profile",isLoggedIn, getProfile)
router.post("/forgotpassword", forgotPassword);

// router.get("/profile",isLoggedIn, authorize(AuthRoles.ADMIN),getProfile)



export default router