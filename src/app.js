import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import { swaggerUi,specs } from "./swagger.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use("/api/v1",routes)

//swagger setup
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs))


app.get("/",(_req,res)=>{
    res.send("hello world")
})

app.all("*",(_req,res)=>{

    res.status(404).json({

        success:false,
        message:"Route not found"
 } )

})



export default app;


