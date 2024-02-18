import mongoose from 'mongoose';
const HistorySchema = new mongoose.Schema({
    Pdf_used_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pdf_details"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    exam_details_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam_details"
    }
}, { timestamps: true });
export const History = mongoose.model('History', HistorySchema)