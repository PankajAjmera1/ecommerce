import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    
    {
        name:{
            type:String,
            required:[true,"Please provide collection name"],
            trim:true,
            maxLength: [100,"Collection name can not be more than 100 characters"],

        },
        
    },
    {timestamps:true}
);

export default mongoose.model("Collection",collectionSchema)