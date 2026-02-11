import mongoose from "mongoose";

const connecDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongoose is connect ')
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connecDB