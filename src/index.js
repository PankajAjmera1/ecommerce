import mongoose from "mongoose";
import app from "./app.js"
import config from "./config/index.js";

//iify
(async()=>{
    try {
       await mongoose.connect(config.MONGODB_URL)
       console.log("DB CONNECTED !");

       //on event
       app.on('error',(err)=>{
        console.error("Error: " ,err);
        throw err
       })

       const onListening=()=>{
           console.log(`Listening on Port ${config.PORT}`)
       }
       app.listen(config.PORT,onListening)
    } catch (err) {
        console.error("Error: " ,err)
        throw err
    }
})()