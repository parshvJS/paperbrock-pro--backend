// import pdf from 'pdf-parse'; // Correct import statement

import PdfParse from "pdf-parse";
import { asyncHandler } from "../utils/asyncHandler.js";

const getFile = asyncHandler(async (req, res) => {
    let files = [];
    console.log(req.files);

    // let dataBuffer = fs.readFileSync(`${req.files[0].path}`);
 
    PdfParse(dataBuffer).then(function(data) {
        console.log(data.numpages);
        console.log(data.numrender);
        console.log(data.info);
        console.log(data.metadata); 
        console.log(data.version);
        console.log(data.text); 
    });
});

export { getFile };