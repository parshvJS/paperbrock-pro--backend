import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Trying to connecting Database !")
        await mongoose.connect(`mongodb+srv://parshvsheth:parshv@paperbrock-n.kxejurc.mongodb.net/p`)
        console.log("Connected Database !")
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

export default connectDB