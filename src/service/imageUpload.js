import s3 from "../config/s3.config.js";


export const s3FileUpload = async ({bucketName,key,body,ContentType}) => {
    return await s3.upload({
        Bucket:bucketName,
        Key:key,
        Body:body,
        ContentType:ContentType
    })
    .promise()
}


export const s3deleteFile = async ({bucketName,key}) => {
    return await s3.deleteObject({
        Bucket:bucketName,
        Key:key
    })
    .promise()
}


   