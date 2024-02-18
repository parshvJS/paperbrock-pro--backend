import mongoose from 'mongoose';
const exam_details_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String
    }
},{timestamps:true});
export const Exam_details = mongoose.model('Exam_details',exam_details_Schema)