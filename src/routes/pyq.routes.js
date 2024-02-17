import Routes from "express"
import { upload } from "../middleware/multer.middleware";
const route =Routes();

route.route('/pyq').post(upload.fields([
    {name:"pyq",maxCount:}
]))