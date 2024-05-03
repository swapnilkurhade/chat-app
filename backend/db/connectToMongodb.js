import mongoose from "mongoose";

const connectToMongodb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('Connected to mogodb....');
    } catch (error) {
        console.log('Error connecting to mongodb....', error.message);
    }
}

export default connectToMongodb;