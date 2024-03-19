import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getPracticeUsage, getUsageBluePrint } from "../controller/practicePaper.controllers.js";

const practice = Router();

// route for getting practice paper usage  in array
practice.route("/getPracticeUsage").get(
    verifyJWT,
    getPracticeUsage
)
practice.route("/getPracticeDetails").get(
    verifyJWT,
    getUsageBluePrint
)
export {practice}
