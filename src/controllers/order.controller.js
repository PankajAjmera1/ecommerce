import Product from "../models/product.schema.js"
import Order from "../models/order.schema.js"
import Coupon from "../models/copon.schema.js"
import CustomError from "../utils/CustomError.js"
import asyncHandler from "../service/asyncHandler.js"
import razorpay from "../config/razorpay.config.js"


export const generateRazorpayOrderId = asyncHandler(async(req,res)=>{
    const{products,coupon} = req.body
    if(!products || products.length === 0){
        throw new CustomError("No products found", 400)
    }

    let totalAmount = 0
    let discountAmount = 0

    //Do Prodcut calulation based on DB Calls
    let productPriceCalc =Promise.all(
        products.map(async(product)=>{
            const {productId,count} = product;
            const productFromDB = await Product.findById(productId)

            if(!productFromDB){
                throw new CustomError("Product not found", 404)
            }
            if(productFromDB.stock < count){
                return res.status(400).json({
                    error:"Product out of stock"
                })
            }

            totalAmount += productFromDB.price * count

        })
    )
    await productPriceCalc;

    //check for coupon discount,if applicable
    if(coupon){
        const couponFromDB = await Coupon.findOne({couponCode:coupon})
        if(!couponFromDB){
            throw new CustomError("Coupon not found", 404)
        }
        if(couponFromDB.minAmount > totalAmount){
            return res.status(400).json({
                error:"Coupon not applicable"
            })
        }
        discountAmount = (totalAmount * couponFromDB.discount) / 100
    }
    const options ={
        amount:Math.round(totalAmount*100),
        currency:"INR",
        receipt:`receipt_${new Date().getTime()}`
    }

    const order =await razorpay.orders.create(options)
    if(!order){
        throw new CustomError("Failed to generate order", 400)
    }
    res.status(200).json({

        success:true,
        message:"Razorpay Order generated successfully",
        order

    })
})


//add order in database and update product stock
export const generateOrder = asyncHandler(async(req,res)=>{
    
})




//get only my orders
export const getMyOrders = asyncHandler(async(req,res)=>{
    
})


//get all order admin
export const getAllOrders = asyncHandler(async(req,res)=>{
    
})


//update order status:admin
export const updateOrderStatus = asyncHandler(async(req,res)=>{
    
})