import fs from 'fs';
import pdf from '../../node_modules/pdf-parse/lib/pdf-parse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

let exam_paper = {};
// flowchart - take file from req > read file > remove noise > give to chat gpt > return object of data 
// limitations :
// 1. cant process OCR
// 2. cant process image related questions

const addToExamPaper = asyncHandler(async (req, res) => {
    console.log(req.files);
    const files = Array.isArray(req.files) ? req.files : [req.files];
    for (let i = 0; i < files.length; i++) {
        const paper = files[i];
        const exam = await getFile(paper.path);
        exam_paper[`${paper.originalname}`] = exam; 
    }
    
});

const getFile = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const cleared = removeHeaderFooter(data.text);
    return cleared;
};

const removeHeaderFooter = (text, threshold = 0.03) => {
    const nonEnglishRegex = /[^a-zA-Z0-9\s.,?!'"()\[\]{}:;-]/g;
    // Remove non-English characters from the text
    let cleanedTexts = text.replace(nonEnglishRegex, '');
    const refinedText = cleanedTexts.replace(/^\s*[\r\n]/gm, '').trim();

    const lines = refinedText.split('\n');

    const yPosThreshold = threshold * lines.length;

    let cleanedText = lines.filter((line, index) => index >= yPosThreshold).join('\n');

    cleanedText = cleanedText.split('\n').reverse().filter((line, index) => index >= yPosThreshold).reverse().join('\n');

    return cleanedText;
};

export { addToExamPaper };
