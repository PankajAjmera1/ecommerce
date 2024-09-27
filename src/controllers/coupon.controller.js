import Coupon from "../models/copon.schema.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";


//create coupon
export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount } = req.body;

    if (!code || !discount) {
        throw new CustomError("All fields are required", 400);
    }

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
        throw new CustomError("Coupon already exists", 400);
    }

    const coupon = await Coupon.create({

        code,
        discount
    });     

    res.status(200).json({
        success: true,
        message:"Coupon created successfully",
        coupon
    });
})

//update coupon
export const updateCoupon = asyncHandler(async (req, res) => {

    
    
    const { id:couponId } = req.params;
    const {action} = req.body;


    const coupon = await Coupon.findByIdAndUpdate(
        couponId,
        {
            active:action
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!coupon) {
        throw new CustomError("Coupon not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        coupon
    })




})


//get all coupons

export const getAllCoupons =asyncHandler(async (req, res) => {
    const allCoupons = await Coupon.find();
    if(!allCoupons){
        throw new CustomError("Coupons not found", 404);
    }

    res.status(200).json({
        success: true,
        message:"All coupons",
        allCoupons
    });
})




//delete coupon

export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id:couponId } = req.params;

    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
        throw new CustomError("Coupon not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
        coupon
    })

})


//disable coupon
export const disableCoupon = asyncHandler(async (req, res) => {
    const { id:couponId } = req.params;

    const coupon = await Coupon.findByIdAndUpdate(
        couponId,
        {
            active:false
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!coupon) {
        throw new CustomError("Coupon not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Coupon disabled successfully",
        coupon
    })
    
})

