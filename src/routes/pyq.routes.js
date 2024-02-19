import Routes from "express"
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkPlan } from "../middleware/planChecker.middleware.js";
import { NUMBER_OF_PLANS, pdfPerPlanIncreament } from "../constants.js";
import { addToExamPaper } from "../controller/pyq.controller.js";
const pyqRoute = Routes();


// pyqRoute.route('/pyq').post
//     (
//         // verifyJWT,
//         // checkPlan,
//         // (req, res, next) => {
//         //     pdfAmount(req, res)
//         //     next()
//         // },
//         // TODO: add maxCount to pdfAmoun
//         upload.fields([{ name: "pyq", maxCount: 5 }]),
//         getFile
//         // TODO: add controller for PYQ
//     )
    pyqRoute.route('/pyq').post(
        verifyJWT,
        upload,
        addToExamPaper
    );
    
export { pyqRoute }