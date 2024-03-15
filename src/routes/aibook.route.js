import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getUserAnswers } from "../controller/aibook.contollers.js";

const aibook = Router();

aibook.route("/aibook").post(
    verifyJWT,
    getUserAnswers
)

export { aibook }