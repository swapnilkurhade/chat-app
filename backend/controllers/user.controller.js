import User from "../models/user.model.js";


export const getUsers = async(req, res) =>{
    try {
        const loggedInUser = req.user_id;

        const allUsers = await User.find({
            _id : {
                $ne : loggedInUser
            }
        }).select("-password")

        res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).json({ error : 'Internal Server Error...'})
    }
}