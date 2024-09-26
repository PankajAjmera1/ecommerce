import {Router} from "express";
import { createCollection 
    ,getAllCollection,
    updateCollection,
    deleteCollection
} from "../controllers/collection.controller.js";
import {isLoggedIn,authorize} from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";




const router = Router();

//create a new collection
router.post("/create",isLoggedIn,authorize(AuthRoles.ADMIN),createCollection)

//update collection
router.put("/updateCollection/:id",isLoggedIn,authorize(AuthRoles.ADMIN),updateCollection)

//get all collection
router.get("/getCollection",getAllCollection)

//delete collection
router.delete("/:id",isLoggedIn,authorize(AuthRoles.ADMIN),deleteCollection)


export default router

