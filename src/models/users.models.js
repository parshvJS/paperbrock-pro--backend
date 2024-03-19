import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String
    },
    plan:{
        type:Number,
        default:-1
    },
    planSubData:{
        type:String
    },
    usage_history: {
        type: []
    },
    paper_usage : {
        type:String
    }
}, { timestamps: true });

usersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password, 7);
    next();
})

usersSchema.methods.isPasswordCorrect = async function (password) {
    if (await bcrypt.compare(password, this.password)) return true;
    else return false;
}

usersSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            stream: this.stream,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
usersSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            stream: this.stream,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', usersSchema);