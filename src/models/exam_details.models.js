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
    },
    pdf_url:{
        type:[
            {
                type:String,
                required:true
            }
        ]
    },
    help:{
        type:String,
        default:"No Help Added !"
    },
    color:{
        type:String,
        default:"#FF33FF"
    },
    data:{
        type:String
    }
},{timestamps:true});
export const Exam_details = mongoose.model('Exam_details',exam_details_Schema)