import { User } from "../models/users.models.js";
import { apiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// middleware to decode accessToken and append user info to request
const verifyJWT = asyncHandler(
    // extract cookies
    // decode accesstoken 
    // get data from Db related to cookie
    // append user into request
    async (req, res, next) => {
        const accessToken =await req.cookies.AccessToken || req.header("Authorization")?.replace("Bearer ", "") ;
        if (!accessToken) throw new apiError(404, "Unauthorized Request Sent !");

        const decodedAccessToken = await jwt.verify(String(accessToken),process.env.ACCESS_TOKEN_SECRET);
        if (!decodedAccessToken) throw new apiError(500, "No data found in Cookies !")

        const userInDb = await User.findById(decodedAccessToken._id).select("-password -refresh_token")
        if (!userInDb) throw new apiError(500, "No data found in Database !")

        req.user = userInDb;

        next();
    }
)

export {verifyJWT}