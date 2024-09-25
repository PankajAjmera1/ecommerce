import Coupon from "../models/copon.schema.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";



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


//update coupon
export const updateCoupon = asyncHandler(async (req, res) => {

    const { code, discount } = req.body;
    const { id:couponId } = req.params;

    if (!code || !discount) {
        throw new CustomError("All fields are required", 400);
    }

    const updatedCoupon = await Coupon.findOneAndUpdate(
        { _id: couponId },

        {code,discount},

        { new:true,
          runValidators:true
        }
    );
    if (!updatedCoupon) {
        throw new CustomError("Coupon not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        updatedCoupon
    });


})


//delete coupon

export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id:couponId } = req.params;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
        throw new CustomError("Coupon not found", 404);
    }

    await coupon.remove();
    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully"
    })

})

