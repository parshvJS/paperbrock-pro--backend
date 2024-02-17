import mongoose from 'mongoose';
const streamSchema = new mongoose.Schema({
    name : {
        type:String
    }
},{timestamps:true});
export const  Stream= mongoose.model('Stream',streamSchema)