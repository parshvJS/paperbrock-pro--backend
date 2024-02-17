import {Router} from "express";
import { getAllStreams, insertNewStream } from "../controller/admin.controllers.js";
const admin = Router();

admin.route('/add-stream').post(insertNewStream);
admin.route('/get-streams').get(getAllStreams);

export {admin}
