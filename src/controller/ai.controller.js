import OpenAI from 'openai';
import { pyqPrompt } from '../constants.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.utils.js';
import fs from 'fs'
import { uploadOnCloudinary } from '../utils/cloudinary.utils.js';
import { apiError } from '../utils/apiError.utils.js';
import { Exam_details } from '../models/exam_details.models.js'




const giveAnalayzedData = asyncHandler(async (req, res) => {
    const { name, stream, course, help } = req?.body;
    if (!name || !stream || !course) throw new apiError(400, "Exam Name , Stream and course are required !");
    try {
        let pdf_url = [];
        const resp = {
            "imp_keywords": ["features and application of python", "Input and Output statements", "arithmetic operations", "if and if-else statement", "while loop", "loop concept", "Set in Python", "Dictionary in Python", "assignment operators", "if-elif-else statement", "break, continue and pass statement", "creating patterns using loop", "creating a user-defined module", "random module of Python", "built-in functions of Python", "user-defined function", "math module of Python", "file handling basic Python function", "access string elements using index operator", "read text file and count occurrences of each alphabet", "usage of given file handling methods", "usage of given string methods", "control statements in Python", "printing pattern", "string functions", "finding number of occurrences in list", "append() and extend() methods of list", "automated censor program", "if-else and nested if-else syntax", "basic tuple operations", "randomly filling 0s and 1s into a 4x4 2-dimensional list", "addition and modification of existing item of dictionary", "matching statements with output", "printing Fibonacci sequence using recursion", "advantages of function in Python", "creation of user-defined module and importing procedure", "functions (math.exp(), math.floor(), math.pow())", "plotting sine wave using matplotlib", "various file accessing modes", "functions for writing to file operation", "string functions (endswith(), find())"],
            "topic_frequency": {
                "high": ["features and application of python", "Input and Output statements", "if and if-else statement", "while loop", "creating patterns using loop", "creating a user-defined module", "built-in functions of Python", "user-defined function", "file handling basic Python function", "control statements in Python", "automated censor program", "printing pattern", "basic tuple operations", "functions of datetime module", "functions for writing to file operation", "string functions"],
                "less": ["arithmetic operations", "loop concept", "Set in Python", "Dictionary in Python", "assignment operators", "if-elif-else statement", "break, continue and pass statement", "random module of Python", "math module of Python", "access string elements using index operator", "read text file and count occurrences of each alphabet", "usage of given file handling methods", "usage of given string methods", "randomly filling 0s and 1s into a 4x4 2-dimensional list", "addition and modification of existing item of dictionary", "matching statements with output", "printing Fibonacci sequence using recursion", "advantages of function in Python", "creation of user-defined module and importing procedure", "functions (math.exp(), math.floor(), math.pow())", "plotting sine wave using matplotlib", "various file accessing modes", "string functions (endswith(), find())"]
            },
            "imp_qa": ["Explain if-elif-else control structure in Python.", "Explain type casting in Python.", "Explain features of Python programming language.", "Write a program to calculate simple and compound interest.", "Explain for loop with example.", "Write a program to find the sum of following series.", "Write a program that find whether a given year is a leap year or not.", "List out different types of control statements in Python and explain any one.", "Write a program to print following pattern.", "Explain below string functions.", "Write a program to find the number of times an element occurs in the list.", "Differentiate between append() and extend() methods of list.", "Write an automated censor program that reads the text from a file and creates a new file where all of the four-letter words have been replaced by .", "Write syntax of if-else and nested if-else.", "Explain basic tuple operations with example.", "Write a program to randomly fill in 0s and 1s into a 4x4 2-dimensional list, print the list and find the rows and columns with the most number of 1s.", "Explain addition of an item and modification of existing item of dictionary with example.", "For the given set A{1,2,3,4,5} and B{10,2,3,4,50} match following statement with output.", "Write a program to print Fibonacci sequence up to n numbers using recursion.", "List out functions of datetime module.", "Write advantages of function in Python.", "Explain the creation of user defined module and procedure to import it in other program with example.", "Explain following functions.", "Write a program to plot sine wave using matplotlib.", "List out various file accessing modes and explain each of them.", "List out functions for writing to file operation and explain each.", "Explain following string functions with example."],
            "exam_difficulty": {
                "file1": "medium",
                "file2": "medium"
            },
            "all_questions": {
                "file1": [
                    "List out features and application of python.",
                    "Explain Input and Output statements in Python by giving examples.",
                    "List out arithmetic operations. Build python code that performs three arithmetic operations.",
                    "Explain if and if-else statement with a suitable example.",
                    "Explain while loop with a suitable example.",
                    "Create a Python program to display the following patterns using loop concept.",
                    "Explain how to create a Set in Python by giving example.",
                    "Explain how to create Dictionary in Python. Write a Python program to concatenate two dictionaries into a new one.",
                    "Write a Python program to perform the below operations on the list: Read n numbers from a user, Find positive numbers, Find negative numbers.",
                    "List any six built-in functions of Python.",
                    "Explain a random module of Python with a suitable example.",
                    "Create a user-defined module with a simple functions for finding the area of a square, circle and rectangle. Write a program to import the module and access functions defined in the module.",
                    "Explain the user-defined function of Python with a suitable example.",
                    "Explain math module of Python with suitable example.",
                    "Write a Python program that reads a text file and counts the occurrences of each alphabet in the file. The program should prompt the user to enter the filename.",
                    "Explain the usage of given file handling methods in Python.",
                    "Explain usage of given string methods in Python.",
                    "Explain if-elif-else control structure in Python.",
                    "Explain break, continue and pass statement with suitable example.",
                    "Create a Python program to display the following patterns using loop concept.",
                    "Explain how to create a tuple in Python by giving example.",
                    "Explains how to create a dictionaries in Python. Write a Python program to check if a key exists in a dictionary.",
                    "Write a program to perform the below operations on the list: Read n numbers from a user, Number of odd numbers, Number of even numbers.",
                    "Explain the creation of user defined module and procedure to import it in other program with example.",
                    "Explain math module of Python with suitable example.",
                    "Write a program to print Fibonacci sequence up to n numbers using recursion.",
                    "Explain file handling basic Python function to open and close the text file.",
                    "Explain to access string elements using index operator with a suitable example.",
                    "Write a Python program that reads a text file and counts the occurrences of each alphabet in the file. The program should prompt the user to enter the filename.",
                    "Explain the usage of given file handling methods in Python.",
                    "Explain usage of given string methods in Python."
                ],
                "file2": [
                    "Explain if-elif-else control structure in Python.",
                    "Explain type casting in Python.",
                    "Explain features of Python programming language.",
                    "Write a program to calculate simple and compound interest.",
                    "Explain for loop with example.",
                    "Write a program to find the sum of following series.",
                    "Write a program that find whether a given year is a leap year or not.",
                    "List out different types of control statements in Python and explain any one.",
                    "Write a program to print following pattern.",
                    "Explain below string functions.",
                    "Write a program to find the number of times an element occurs in the list.",
                    "Differentiate between append() and extend() methods of list.",
                    "Write an automated censor program that reads the text from a file and creates a new file where all of the four-letter words have been replaced by .",
                    "Write syntax of if-else and nested if-else.",
                    "Explain basic tuple operations with example.",
                    "Write a program to randomly fill in 0s and 1s into a 4x4 2-dimensional list, print the list and find the rows and columns with the most number of 1s.",
                    "Explain addition of an item and modification of existing item of dictionary with example.",
                    "For the given set A{1,2,3,4,5} and B{10,2,3,4,50} match following statement with output.",
                    "Write a program to print Fibonacci sequence up to n numbers using recursion.",
                    "List out functions of datetime module.",
                    "Write advantages of function in Python.",
                    "Explain the creation of user defined module and procedure to import it in other program with example.",
                    "Explain following functions.",
                    "Write a program to plot sine wave using matplotlib.",
                    "List out various file accessing modes and explain each of them.",
                    "List out functions for writing to file operation and explain each.",
                    "Explain following string functions with example."
                ]
            }
        }
        // Upload all files to Cloudinary
        await Promise.all(req.files.map(async (file) => {
            const upload_url = await uploadOnCloudinary(file.path);
            pdf_url.push(upload_url);
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }
                console.log('File deleted successfully');
            });
        }));



        const uploadToDb = await Exam_details.create(
            {
                name: name,
                subject: stream,
                course: course,
                pdf_url: pdf_url,
                help: help,
                data:JSON.stringify(resp)
            }
        )

        if (!uploadToDb) throw new apiError(505, "can't upload data !");
        return res.json(new apiResponse(200,
            {
                id: uploadToDb._id,
                resp: resp
            }
        ));
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(new apiResponse(500, 'Internal Server Error'));
    }
});

const getDbAnalayzedData  = asyncHandler(
    async(req,res) =>{
        const {params} = req.body;

        const data = await Exam_details.findById(params).select("data -_id")
        console.log(data)
        return res.json(
            new apiResponse(200,data)
        )
    }
)


export { giveAnalayzedData,getDbAnalayzedData }