import User from "../models/user.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js"
import config from "../config/index.js"
import CustomError from "../utils/CustomError.js"



export const isLoggedIn = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.cookies.token || req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        token = req.cookies.token || req.headers.authorization.split(" ")[1]
        //TOKEN ="Bearer dfkjkjf23"
    }

    if(!token){
        throw new CustomError("Login to access this resource",401)
    }

    try {
        const decodedJWTpayload = JWT.verify(token,config.JWT_SECRET);
        req.user = await User.findById(decodedJWTpayload._id, "name email role")
        next()
    } catch (err) {
        throw new CustomError("Not Authorized to access this resource",401)
    }



})


//roles
export const authorize = (...requiredRoles)=>asyncHandler(async(req,res,next)=>{

    if(!requiredRoles.includes(req.user.role)){
        throw new CustomError("Not Authorized to access this resource roles",403)
    }

    next()
})