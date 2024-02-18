import { Router } from "express";
import { LoggOutUser, getCurrentUser, logInUser, refreshAccessToken, registerUser } from "../controller/users.contoller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const route = Router()

route.route('/register').post(registerUser);
route.route('/login').post(logInUser);
route.route('/logout').post(verifyJWT,LoggOutUser);
route.route('/refresh-access-token').post(verifyJWT,refreshAccessToken);
route.route('/user').get(getCurrentUser);



export {route}