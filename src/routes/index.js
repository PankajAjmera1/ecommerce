import {Router} from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import collectionRoutes from "./collection.routes.js";
import couponRoutes from "./coupon.routes.js"



const router = Router();

router.use("/auth",authRoutes) ;
router.use("/collection",collectionRoutes)
router.use("/product",productRoutes)
router.use("/coupon",couponRoutes)




export default router