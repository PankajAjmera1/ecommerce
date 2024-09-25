import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide product name"],
        trim:true,
        maxLength: [100,"Product name should not be more than 100 characters"],
    },
    price:{
        type:String,
        required:[true,"Please provide product price"],
        maxLength: [5,"Product price should not be more than 5 characters"],
    },
    description:{
        type:String,
        required:[true,"Please provide product description"],
    },
    photos:[
        {
            secure_url:{
                type:String,
                required:[true,"Please provide product image"]
            }
        }
    ],
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    collectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection"
    }
},
{timestamps:true})



export default mongoose.model("Product",productSchema)