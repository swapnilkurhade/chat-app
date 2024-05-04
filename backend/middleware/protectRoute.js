import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

const protectRoute = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({ error : 'Unauthorized - No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({ error : 'Unauthorized - Invalid token'})
        }

        const usr = await user.findById(decoded.userId).select("-password");

        if(!usr){
            return res.status(404).json({ error : 'User not found'})
        }

        req.user = usr; 

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error : 'Internal Server Error...'})
    }
}

export default protectRoute;
