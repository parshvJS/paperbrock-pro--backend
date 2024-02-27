import { resOptions } from "../constants.js";
import { Stream } from "../models/admin/streams.models.js";
import { User } from "../models/users.models.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
// --------------------------------------controllers utils

// to check if stream selected by user is valid stream available in system
async function isStreamAvailable(key) {
    const streamsAvailable = await Stream.find()
    for (let i = 0; i < array.length; i++) {
        if (key === streamsAvailable[i].name) {
            return true;
        }
    }
    return false;
}

// generate access token , refresh token , store refresh token in DB,and return tokens
async function generateRefreshAccessToken(userId) {
    // get user from argument 
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const AccessToken = await user.generateAccessToken();
    user.refresh_token = refreshToken;
    user.save({ validateBeforeSave: false });
    console.log("func", refreshToken, AccessToken)
    return { refreshToken, AccessToken };
}

// -------------------------------------main controllers 

// controller to add new user into system
const registerUser = asyncHandler(
    async (req, res, next) => {
        const { password, email, fullName, stream } = req.body;

        // validate if data of user already exist 
        const emailExist = await User.findOne({ email }).select("email");
        console.log(emailExist)
        if (email == emailExist?.email) throw new apiError(400, "Email Alreay Exist !");

        // check if stream only exist from selected data 

        // const isStreamAvailable = isStreamAvailable(stream);
        // if (!isStreamAvailable) throw new apiError(400, "Chosen Stream Is not Available !");

        // create document of user in database
        const userDb = await User.create({
            fullName:fullName ? fullName : "",
            email,
            password,
            stream
        });
        // check if user is created in Database
        if (!userDb._id) throw new apiError(505, "Can't create user !")
        const userInDb = await User.findById(userDb._id).select("-password -refresh_token");

        if (!userInDb) throw new apiError(505, "Can't create user !")

        return res
            .status(200)
            .json(
                new apiResponse(200, userInDb, "User Registed Successfully !")
            )
    }
)

// controller to login existing user
const logInUser = asyncHandler(

    // get data from request
    // check is data is available or not
    // check is user is signed in or not
    // check if password of that email is correct or not
    // generate refresh token and access token from method
    // if successfully generated then sent both tokens in form of cookies

    async (req, res) => {
        const { email, password } = req.body;
        console.log(email)
        if (!email && !password)
        { throw new apiError(404, "Please provide Email And password !"); }

        const userInDb = await User.findOne({ email });
        if (!userInDb) throw new apiError(404, "You are not registed ! Please Register before Log in !");

        const isPasswordRight = await userInDb.isPasswordCorrect(password);
        if (!isPasswordRight) throw new apiError(404, "Password Is In Correct !");

        const { refreshToken, AccessToken } = await generateRefreshAccessToken(userInDb._id);

        const loggedInUser = await User.findById(userInDb._id).select("-password -refresh_token");

        return res.status(200)
            .cookie("AccessToken", AccessToken, resOptions)
            .cookie("refreshToken", refreshToken, resOptions)
            .json
            (
                new apiResponse
                    (
                        200,
                        {
                            user: loggedInUser,
                            tokens:
                            {
                                "AccessToken": AccessToken,
                                "RefreshToken": refreshToken
                            }
                        },
                        "Logged in successfully !"
                    )
            )
    }
)

// get userid from request (verifyJWt), delete refreshtoken from DB 
const LoggOutUser = asyncHandler(
    async (req, res) => {
        const userId = req.user._id
        await User.findByIdAndUpdate(
            userId,
            {
                $unset: {
                    refresh_token: 1
                },
            },
            {
                new: true
            }
        );

        return res
            .status(200)
            .clearCookie("AccessToken")
            .clearCookie("refreshToken")
            .json(
                new apiResponse(
                    200,
                    {},
                    "Logged Out Succesfully !"
                )
            )
    }
)

//validate user's refreshToken and generate new access and refresh Token
const refreshAccessToken = asyncHandler(
    async (req, res) => {
        const clientRefreshToken = req.cookies.refreshToken || req.body?.refreshToken;
        if (!clientRefreshToken) throw new apiError(404, "cookie is invalid or empty !");

        const decodedRefreshToken = jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decodedRefreshToken) throw new apiError(500, "Invalid cookie no data found in cookie !");

        const userInDb = await User.findById(decodedRefreshToken._id || req.user._id).select("-password");
        if (!userInDb) throw new apiError(505, "No data found in Database !");

        if (clientRefreshToken !== userInDb.refresh_token) {
            throw new apiError(404, "token Mismatched !");
        }

        if (clientRefreshToken == userInDb.refresh_token) {
            const { refreshToken, AccessToken } = await generateRefreshAccessToken(req.user._id || decodedRefreshToken._id);
            return res
                .status(200)
                .cookie("AccessToken", AccessToken, resOptions)
                .cookie("refreshToken", refreshToken, resOptions)
                .json
                (
                    new apiResponse
                        (
                            200,
                            {
                                user: userInDb,
                                Tokens:
                                {
                                    "AccessToken": AccessToken,
                                    "RefreshToken": refreshToken
                                }
                            }
                        )
                )
        }

    }
)

// return user extracted from request.user
const getCurrentUser = asyncHandler(
    async (req, res) => {
        return res.json(
            new apiResponse(
                200,
                {
                    user: req.user
                },
                "User Data"
            )
        )
    }
)

export {
    registerUser,
    logInUser,
    LoggOutUser,
    refreshAccessToken,
    getCurrentUser
}