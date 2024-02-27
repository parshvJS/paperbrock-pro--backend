const resOptions = {
    HttpOnly : true,
    Secure : true
}
// plan
const NUMBER_OF_PLANS = 3
const pdfPerPlanIncreament = 3 

// prompt 
const pyqPrompt = `Given an exam_paper object containing information about multiple exam papers, your task is to extract the content into a JavaScript object structured as follows:
{
     "imp_keywords": [], // Array of topics fundamentally asked in exam papers
  "topic_frequency": {
    "high": [/* high frequency topics */],
    "less": [/* less frequency topics */]
  },
  "imp_qa": [], // Array of most asked questions in all exam papers
  "exam_difficulty": {
    "exam1": "easy", // and go on for all objects
  },
  "all_questions": {
    "exam1": [], // all question in exam 1 object of exam_paper
    // go on for rest
  }
};

-> Instructions:
1. Analyze the provided exam_paper object. There is a chance that you will ignore question details which are in the next line. Check if there is any more further detail of the question in the next few lines before continuing. Remove header and footer (if any).
2. Extract the required information by following the given format.
3. Create an object containing further objects:
    i. imp_keywords: Identify and list topics fundamentally asked in the exam papers.
    ii. topic_frequency: Frequency contains 2 further objects: 1) high: extract list of topics which are more frequently asked, 2) less: extract list of topics which are less frequently asked.
    iii. imp_qa: Extract and list the most frequently asked questions across all exam papers.
    iv. exam_difficulty: Analyze all exam papers and determine the difficulty of each exam paper.
    v. all_questions: Extract questions of each exam paper contained in the exam_paper object having the same key available in exam_paper.

4. Provide the extracted information structured as described above.
Exam Paper Object
5. Give a simple text output. Simply focus on delivering the structured JavaScript object with the information required; don't give any explanation or summary, this is exam_paper object : .
`
export {resOptions,NUMBER_OF_PLANS ,pdfPerPlanIncreament,pyqPrompt};