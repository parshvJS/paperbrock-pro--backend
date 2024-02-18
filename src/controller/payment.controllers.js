import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler';
const stripe = new Stripe(`${process.env.STRIPE_KEY}`);

// controller :: usage : to provide payment gateway ,subscribe plans
//              1.take payment from user
//              2.redirect user to success page or ussuccess page 
//              3.store the plan to database(plan and Date)
// middleware :: usage :whenever subscription needed to access specific feature ,this MW return plan subscribed by user
//              1.extract cookies from request 
//              2.using that cookie user will be found 
//              3.entry checked if user is having plan ,if yes then plan number checked
//              4.return -1 is no plan or return plan number 

// controller > verifyJWT > planChecker > usageOfPlan


const checkout = asyncHandler(
    async (req,res) =>{
        const plan = req.body;
        
        const session = await stripe.checkout.sessions.create({

        })
    }
)