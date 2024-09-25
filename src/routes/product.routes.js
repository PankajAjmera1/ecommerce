import { Router } from "express";
import {
    addProduct,
    getAllProducts,
    getProductById,
    getProductByCollectionId,
    deleteProduct, 
    updateProduct
} 
from "../controllers/product.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";



const router = Router();

router.post("/add", isLoggedIn, addProduct)
router.get("/get", getAllProducts)
router.get("/get/:id", getProductById)
router.get("/get/:collectionId", getProductByCollectionId)
router.delete("/delete/:id", deleteProduct)
router.put("/update/:id", updateProduct)

export default router