import mongoose from 'mongoose';
const pdf_details_Schema = new mongoose.Schema({
    url:{
        type:String
    }
},{timestamps:true});
export const Pdf_details = mongoose.model('Pdf_details',pdf_details_Schema)