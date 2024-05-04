import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import msgRoutes from './routes/message.routes.js'
import userRoutes from './routes/users.routes.js'
import connectToMongodb from "./db/connectToMongodb.js";

// initialisation
dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 8000;

// middleware

app.use(express.json());
app.use(cookieParser());

// Route middlewares....
app.use('/api/auth', authRoutes)
app.use('/api/messages', msgRoutes)
app.use('/api/users', userRoutes)
 
// routes

app.get('/',(req, res)=>{
    res.send('Sever is ready...')
})

// Listen
app.listen(PORT,()=>{
    connectToMongodb();
    console.log(`Server is running at ${PORT}`);
})