import Collection from "../models/collection.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";


/**********************************************************
 * @CREATE_COLLECTION
 * @route https://localhost:5000/api/collection/
 * @description Controller used for creating a new collection
 * @description Only admin can create the collection
 *********************************************************/

export const createCollection = asyncHandler(async (req, res) => {

    const { name } = req.body;
    if (!name) {
        throw new CustomError(" Collection Name is required", 400);
    }

    const collection = await Collection.create({
        name
    });

    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection
    });


});



/**********************************************************
 * @GET_COLLECTION
 * @route https://localhost:5000/api/collection/:collectionId
 * @description Controller used for getting all collections
 *********************************************************/

//update collection
export const updateCollection = asyncHandler(async (req, res) => {

    const { name } = req.body;
    const { id:collectionId } = req.params;

    if (!name) {
        throw new CustomError(" Collection Name is required", 400);
    }

    const updatedCollection = await Collection.findOneAndUpdate(
        { _id: collectionId },

        {name},

        { new:true,
          runValidators:true
        } 
    );
    if (!updatedCollection) {
        throw new CustomError("Collection not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    });

});


/**********************************************************
 * @GET_COLLECTION
 * @route https://localhost:5000/api/collection/:collectionId
 * @description Controller used for getting all collections
 *********************************************************/

//delete collection
export const deleteCollection = asyncHandler(async (req, res) => {

    const { id:collectionId } = req.params;

    const deletedCollection = await Collection.findOneAndDelete({ _id: collectionId });

    if (!deletedCollection) {
        throw new CustomError("Deleted Collection not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
        deletedCollection
    });


});



/**********************************************************
 * @GET_COLLECTION
 * @route https://localhost:5000/api/collection/
 * @description Controller used for getting all collections
 *********************************************************/


//get all collections
export const getAllCollection = asyncHandler(async (req, res) => {

    const collections = await Collection.find();

    if (!collections) {
        throw new CustomError("Collections not found", 404);
    }

    res.status(200).json({
        success: true,
        collections
    });

});

        

