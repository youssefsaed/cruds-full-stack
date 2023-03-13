import express  from "express";
import { dbConnection } from "./DB/DBConnection.js";
import productRouter from './src/modules/products/product.routes.js'
import cors from 'cors'
const app=express()

dbConnection()
app.use(express.json())
app.use(cors())
const BaseUrl='/app/cruds'
app.use(`${BaseUrl}`,productRouter)



const port=3000
app.listen(port,()=>{
    console.log(`server is connection on ${port}.................`);
})