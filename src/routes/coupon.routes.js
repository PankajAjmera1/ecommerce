import {Router} from "express";
import { createCoupon
    ,getAllCoupons,
    updateCoupon,
    deleteCoupon
} from "../controllers/coupon.controller.js";
import {isLoggedIn,authorize} from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";


const router = Router();
router.post("/create",isLoggedIn,authorize(AuthRoles.ADMIN),createCoupon)
router.get("/get",isLoggedIn,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),getAllCoupons)
router.put("/action/:id",isLoggedIn,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),updateCoupon)
router.delete("/:id",isLoggedIn,authorize(AuthRoles.ADMIN,AuthRoles.MODERATOR),deleteCoupon)

export default router;