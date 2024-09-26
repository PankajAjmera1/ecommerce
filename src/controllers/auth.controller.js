import User from "../models/user.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import mailHelper from "../utils/mailHelper.js";
import crypto from "crypto"



// cookie options
export const cookieOptions={
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),//3 days
    httpOnly: true
}




//sign up a new user
export const signUp =asyncHandler(async(req,res) =>{
    //get data from request body
    const{name,email,password}=req.body

    //validation
    if(!name || !email || !password){
        throw new CustomError("All fields are required",400)
    }
    //check if user already exists
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new CustomError("User already exists",400)
    }

    //add this to database
   const user = await User.create({
        name,
        email,
        password

    })
    const token =user.getJWTToken()
    //safety
    user.password = undefined

    //store this token in user's browser
    res.cookie("token",token,cookieOptions)

    res.status(200).json({
        success:true,
        user,
        token
    })


    


})


//login a user
export const login =asyncHandler(async(req,res) =>{
    const{email,password}=req.body

    //validation
    if(!email || !password){
        throw new CustomError("All fields are required",400)
    }

    //check if user exists
    const user = await User.findOne({email}).select("+password")
    if(!user){
        throw new CustomError("Invalid credentials",400)
    }

    //check if password is correct
    const isPasswordMatched =await user.comparePassword(password)

    if(isPasswordMatched){
        const token =user.getJWTToken()

        //safety
        user.password = undefined

        //store this token in user's browser
        res.cookie("token",token,cookieOptions)
        return res.status(200).json({
            success:true,
            user,
            token
        })
    }
    else{
        throw new CustomError("Password is incorrect",400)
    }

})

//logout a user
export const logout =asyncHandler(async(req,res) =>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})



//get a profile
export const getProfile =asyncHandler(async(req,res) =>{
    const {user} = req
    if(!user){
        throw new CustomError("User not found",404)
    }

    res.status(200).json({
        success:true,
        user
    })
})




//forgot password
export const forgotPassword =asyncHandler(async(req,res) =>{
    const {email} = req.body
    //NO   email
    if(!email){
        throw new CustomError("Email is required",400)
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError("User not found",404)
    }

    const resetToken =user.generateForgotPasswordToken()

    await user.save({validateBeforeSave:false})

    const resetUrl =`${req.protocol}://${req.get("host")}/api/v1/auth/password/reset/${resetToken}`

    const message = `Click here to reset your password: ${resetUrl}`

    try{
        await mailHelper({
            email:user.email,
            subject:"Password Reset",
            message
        })

        res.status(200).json({
            success:true,
            message:"Email sent successfully"
        })
    }
    catch(error){
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({validateBeforeSave:false})
        throw new CustomError(error.message||"Email not sent",500)
    }
})


//reset password
export const resetPassword =asyncHandler(async(req,res) =>{
    const {token:resetToken} = req.params
    const{password}=req.body
    if(!password){
        throw new CustomError("Password is required",400)
    }

    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    const user = await User.findOne({
        forgotPasswordToken:resetPasswordToken,
        forgotPasswordExpiry:{$gt:Date.now()}
    })
    if(!user){
        throw new CustomError("Token is invalid or expired",400)
    }

    //safety
    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    await user.save()

    const token = user.getJWTToken()
    res.cookie("token",token,cookieOptions)


    res.status(200).json({
        success:true,
        message:"Password reset successfully"

    })


    

    
})