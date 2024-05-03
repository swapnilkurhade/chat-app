import bcryptjs from 'bcryptjs';
import user from "../models/user.model.js";
import generateTokenAndSetCookies from '../utils/generateToken.js';

export const SignUpUser = async(req, res) =>{
    try {

        const { fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({ error : 'Passswords dont match...'})
        }

        const response = await user.findOne({ username });

        if(response){
            return res.status(400).json({ error : 'User aleready exists...'})
        }

        // Hash password here

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new user({
            fullName, username, gender,
            password: hashedPassword,
            profilePic: gender === 'male' ? boyProfile : girlProfile
        })

        if(newUser){

            // Generate jwt Token to send it in response...
            generateTokenAndSetCookies(newUser._id, res)

            await newUser.save();
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic : newUser.profilePic 
            })
        }else{
            res.status(400).json({ error : 'Invalid User Data...'})
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error : 'Internal server error'})
    }
}

export const loginUser = async(req, res) =>{
    try {
        const { username, password } = req.body;

        const response = await user.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, response?.password || "");

        if(!response || !isPasswordCorrect){
            return res.status(400).json({ error : 'Invaid credentials...'})
        }

        generateTokenAndSetCookies(response._id, res);

        res.status(200).json({
            _id: response._id,
            fullName: response.fullName,
            username: response.username,
            profilePic : response.profilePic 
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error : 'Internal Server error...'})
    }
}

export const logoutUser = (req, res) =>{
    try {
        res.cookie('jwt',"", { maxAge : 0 })
        res.status(200).json({ message : 'User Logged out Successfully...'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error : 'Internal Server error...'})
    }
}