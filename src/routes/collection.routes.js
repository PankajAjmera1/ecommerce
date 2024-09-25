import {Router} from "express";
import { createCollection 
    ,getAllCollection
} from "../controllers/collection.controller.js";




const router = Router();

router.post("/create",createCollection)
router.get("/getCollection",getAllCollection)


export default router

