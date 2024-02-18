import fs from 'fs';
import pdf from '../../node_modules/pdf-parse/lib/pdf-parse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getFile = asyncHandler(async (req, res) => {
    const filePath = req.files[0]?.path;

    const dataBuffer = fs.readFileSync(filePath);

    pdf(dataBuffer).then((data) => {
        // TODO: sent response to chat gpt and get response

    }).catch((error) => {
        console.error('Error parsing PDF:', error);
    });
});

const removeHeaderFooter = (text, threshold = 0.1) => {
    const lines = text.split('\n');

    const yPosThreshold = threshold * lines.length;

    let cleanedText = lines.filter((line, index) => index >= yPosThreshold).join('\n');

    cleanedText = cleanedText.split('\n').reverse().filter((line, index) => index >= yPosThreshold).reverse().join('\n');

    return cleanedText;
};



export { getFile };
