import moment from "moment";
import { User } from "../models/users.models";
import { asyncHandler } from "../utils/asyncHandler";
// TODO: integret strip system to check subscription
// because user can cancel the plan 
// this code check is 30 days is over or not  
// is over then remove plan from database and return 0
// else return 1
const verifyPlan = asyncHandler(
    async (req, res, next) => {
        const dateInDb = await User.findById(req.user._id);
        const expireData = dateInDb.clone().add(30, 'days');

        // Get current date
        const currentDate = moment();

        // Compare dates
        if (currentDate.isBefore(expireData)) {
           req.planValid = 1;
        } else {
            await User.findByIdAndUpdate(req.user._id,
                {
                    $unset: {
                        plan: 1,
                        planSubData: 1
                    }
                })
            req.planValid=0;
        }
        next();
    }
)

export 
{
    verifyPlan
}