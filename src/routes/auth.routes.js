import {Router} from "express";
import {  isLoggedIn } from "../middlewares/auth.middleware.js";
// import { authorize, isLoggedIn } from "../middlewares/auth.middleware";
// import AuthRoles from "../utils/authRoles";

import {signUp,login,logout,getProfile, forgotPassword, resetPassword} from "../controllers/auth.controller.js"

const router = Router();

//signup
router.post("/signup", signUp)

//login
router.post("/login", login)

//logout
router.get("/logout", logout)

//forgot password
router.post("/password/reset/", forgotPassword);


//reset password
router.post("/password/reset/:token", resetPassword);


//profile
router.get("/profile",isLoggedIn, getProfile)



// router.get("/profile",isLoggedIn, authorize(AuthRoles.ADMIN),getProfile)



export default router