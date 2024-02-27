// middleware :: usage :whenever subscription needed to access specific feature ,this MW return plan subscribed by user
//              1.extract cookies from request 
//              2.using that cookie user will be found 
//              3.entry checked if user is having plan ,if yes then plan number checked
//              4.return -1 is no plan or return plan number 

import { User } from "../models/users.models.js";
import { apiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const checkPlan = asyncHandler(
    async (req, res, next) => {
        req.plan=3
        // if(req.planValid == 1){
        //     const userId = await req.user._id;
        //     if (!userId) throw new apiError(505, "No related data found !");
    
        //     const userInDb = await User.findById(userId);
        //     if (!userInDb) throw new apiError(505, "No user data found in database !");
    
        //     if (String(userInDb.plan) == String(-1)) {
        //         req.plan = -1;
        //     }
        //     else if (String(userInDb.plan) != String(-1) && String(userInDb.plan) >= `${process.env.NUMBER_OF_PLANS}`) {
        //         req.plan = userInDb.plan;
        //     }
        //     else {
        //         req.plan = -1;
        //         throw new apiError(505, "Can't retrive your active plan")
        //     }
        // }
        // else {
        //     req.plan = -1;
        // }
        next();
    }
)