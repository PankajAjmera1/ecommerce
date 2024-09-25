import Product from "../models/product.schema.js";
import CustomError from "../utils/CustomError.js";
import formidable from "formidable";
import { s3FileUpload,s3deleteFile } from "../service/imageUpload.js";
import Mongoose from "mongoose";
import config from "../config/index.js";
import fs from "fs"
import asyncHandler from "../service/asyncHandler.js";




// export const addProduct = asyncHandler(async (req, res) => {
//     const form = formidable({ multiples: true , keepExtensions: true });
//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             throw new CustomError(err.message || "Something went wrong", 400);
//         }

       

//         let productId =new Mongoose.Types.ObjectId().toHexString();
//             console.log(fields,files)

//         if(!fields.name ||
//             !fields.price ||
//             !fields.description ||
//             !fields.collectionId
//         ){
//             throw new CustomError("All fields are required", 400);
//         }
        

        

//         let imgArrayResponse =Promise.all(
//             Object.keys(files).map(async (file,index) => {
//                 const element =files[file][0]
//                 console.log(files)
//                 const data =fs.readFileSync(element.filepath)

//               const upload = await s3FileUpload({
//                     bucketName:config.S3_BUCKET_NAME,
//                     key:`products/${productId}/photo_${index+1}.png`,
//                     body:data,
//                     contentType:element.mimetype
//                 })
//                 // console.log(upload)
//                 return{
//                     secure_url:upload.Location
//                 }

//             })
//         )
//         let imgArray =await imgArrayResponse
//         const product = await Product.create({
//             _id:productId,
//            photos:imgArray,
//            ...fields,

//         });
//         console.log(product)

//             if(!product){
//                 throw new CustomError("product not created", 400);
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "product created successfully",
//                 product
//             });
        
//         })


// });


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 400);
        }

        let productId = new Mongoose.Types.ObjectId().toHexString();
        console.log(fields, files);

        // Ensure fields are cast to strings if they are arrays
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const collectionId = Array.isArray(fields.collectionId) ? fields.collectionId[0] : fields.collectionId;

        // Check for missing fields
        if (!name || !price || !description || !collectionId) {
            throw new CustomError("All fields are required", 400);
        }

        let imgArrayResponse = Promise.all(
            Object.keys(files).map(async (file, index) => {
                const element = files[file][0];
                console.log(files);
                const data = fs.readFileSync(element.filepath);

                const upload = await s3FileUpload({
                    bucketName: config.S3_BUCKET_NAME,
                    key: `products/${productId}/photo_${index + 1}.png`,
                    body: data,
                    contentType: element.mimetype,
                });
                return {
                    secure_url: upload.Location,
                };
            })
        );

        let imgArray = await imgArrayResponse;
        const product = await Product.create({
            _id: productId,
            photos: imgArray,
            name: name,
            price: price,
            description: description,
            collectionId: collectionId,
        });
        console.log(product);

        if (!product) {
            throw new CustomError("Product not created", 400);
        }

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    });
});



 
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    if(!products){
        throw new CustomError("products not found", 404);
    }
    res.status(200).json({
        success: true,
        products
    });
});


export const getProductById = asyncHandler(async (req, res) => {
    const {id:productId} = req.params;
    const product = await Product.findById(productId);
    if(!product){
        throw new CustomError("product not found", 404);
    }

    res.status(200).json({
        success: true,
        product
    });
});


export const getProductByCollectionId = asyncHandler(async (req, res) => {
    const {id:collectionId} = req.params;

    const products = await Product.find({collectionId});


    if(!products){
        throw new CustomError("products not found using collectionid", 404);
    }

    res.status(200).json({
        success: true,  
        products
    });
});


//delete product
// export const deleteProduct = asyncHandler(async (req, res) => {

//     const {id:productId} = req.params;

//    const product = await Product.findById(productId);

//    if(!product){
//     throw new CustomError("product not found", 404);
//    }
// //    const deletePhots =Promise.all(
// //     product.photos.map(async (photo,index) => {
// //         await s3deleteFile({
// //             bucketName:config.S3_BUCKET_NAME,
// //             key:`products/${product._id.toString()}/photo_${index+1}.png`,
// //         })
// //     })
// //    )
// const deletePhots = Promise.all(
//     product.photos.map(async (photo, index) => {
//         try {
//             await s3deleteFile({
//                 bucketName: config.S3_BUCKET_NAME,
//                 key: `products/${product._id.toString()}/photo_${index + 1}.png`,
//             });
//         } catch (error) {
//             // If S3 returns AccessDenied or any other error, log it and handle appropriately
//             console.error("Error deleting file from S3:", error.message);
//             throw new CustomError("Unable to delete product photos", 500);
//         }
//     })
// );


//    await deletePhots;
//    await product.remove();
//    res.status(200).json({
//     success: true,
//     message: "product deleted successfully"
//    })

// })
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    // Delete photos from S3
    const deletePhotos = Promise.all(
        product.photos.map(async (photo, index) => {
            try {
                await s3deleteFile({
                    bucketName: config.S3_BUCKET_NAME,
                    key: `products/${product._id.toString()}/photo_${index + 1}.png`,
                });
            } catch (error) {
                console.error("Error deleting file from S3:", error.message);
                throw new CustomError("Unable to delete product photos", 500);
            }
        })
    );

    await deletePhotos;

    // Delete product from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});



//update product
export const updateProduct = asyncHandler(async (req, res) => {
    
    const {id:productId} = req.params;

    const product = await Product.findById(productId);
    if(!product){
        throw new CustomError("product not found", 404);
    }

    const form = formidable({ multiples: true , keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 400);
        }

        let imgArrayResponse =Promise.all(
            Object.keys(files).map(async (file,index) => {
                const element =file[fileKey]
                console.log(element)
                const data =fs.readFileSync(element.filepath)

              const upload = await s3FileUpload({

                    bucketName:config.S3_BUCKET_NAME,
                    key:`products/${productId}/photo_${index+1}.png`,
                    body:data,
                    contentTpe:element.mimetype
                })
                console.log(upload)
                return{
                    secure_url:upload.Location
                }

            })
        )
        let imgArray =await imgArrayResponse   

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                ...fields,
                photos:imgArray
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedProduct) {
            throw new CustomError("product not found", 404);
        }

        res.status(200).json({
            success: true,
            message: "product updated successfully",
            updatedProduct
        });

    })

})






