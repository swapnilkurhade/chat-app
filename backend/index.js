import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import connectToMongodb from "./db/connectToMongodb.js";

// initialisation
dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 8000;

// middleware

app.use(express.json());

// Route middlewares....
app.use('/api/auth', authRoutes)

// routes

app.get('/',(req, res)=>{
    res.send('Sever is ready...')
})

// Listen
app.listen(PORT,()=>{
    connectToMongodb();
    console.log(`Server is running at ${PORT}`);
})