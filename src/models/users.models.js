import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    refresh_token:{
        type:String
    },
    usage_history:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"History"
    }
},{timestamps:true});
export const User = mongoose.model('User',usersSchema);