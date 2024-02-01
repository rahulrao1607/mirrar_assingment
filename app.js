import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();
const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/products",productRoutes);

app.get("/",(req,res)=>{
    res.send(`Hello im running here`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT: ${PORT}`);
});