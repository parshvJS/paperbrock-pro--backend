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

const resp = {
  "imp_keywords": [
    "features and application of python",
    "input and output statements in python",
    "arithmetic operations in python",
    "rules for defining variables in python",
    "assignment operators in python",
    "if statement in python",
    "if-else statement in python",
    "while loop in python",
    "for loop in python",
    "patterns using loop concept in python",
    "set creation in python",
    "dictionary creation in python",
    "list operations in python",
    "tuple creation in python",
    "dictionary operations in python",
    "file handling in python",
    "string operations in python",
    "built-in functions of python",
    "random module in python",
    "user-defined module in python",
    "function creation in python",
    "math module in python",
    "leap year in python",
    "series sum in python",
    "row and column operations in python",
    "list element occurrence in python",
    "append and extend methods of list in python",
    "automated censor program in python",
    "nested if-else in python",
    "tuple operations in python",
    "random 2D list generation in python",
    "Fibonacci sequence in python",
    "datetime module functions",
    "advantages of functions in python",
    "matplotlib in python",
    "file accessing modes in python",
    "file writing functions in python",
    "string functions in python"
  ],
  "topic_frequency": {
    "high": [
      "features and application of python",
      "input and output statements in python",
      "arithmetic operations in python",
      "if statement in python",
      "if-else statement in python",
      "while loop in python",
      "patterns using loop concept in python",
      "list operations in python",
      "file handling in python",
      "string operations in python",
      "built-in functions of python",
      "user-defined module in python",
      "function creation in python",
      "leap year in python"
    ],
    "less": [
      "rules for defining variables in python",
      "assignment operators in python",
      "for loop in python",
      "set creation in python",
      "dictionary creation in python",
      "tuple creation in python",
      "dictionary operations in python",
      "random module in python",
      "math module in python",
      "series sum in python",
      "row and column operations in python",
      "list element occurrence in python",
      "append and extend methods of list in python",
      "automated censor program in python",
      "nested if-else in python",
      "tuple operations in python",
      "random 2D list generation in python",
      "Fibonacci sequence in python",
      "datetime module functions",
      "advantages of functions in python",
      "matplotlib in python",
      "file accessing modes in python",
      "file writing functions in python",
      "string functions in python"
    ]
  },
  "imp_qa": [
    "features and application of python",
    "input and output statements in python",
    "arithmetic operations in python",
    "if statement in python",
    "if-else statement in python",
    "while loop in python",
    "patterns using loop concept in python",
    "list operations in python",
    "file handling in python",
    "string operations in python",
    "built-in functions of python",
    "user-defined module in python",
    "function creation in python",
    "leap year in python"
  ],
  "exam_difficulty": {
    "file1": "moderate",
    "file2": "moderate"
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
      "Create a user-defined module with a simple functions for finding the area of a square, circle, and rectangle. Write a program to import the module and access functions defined in the module.",
      "Explain the user-defined function of Python with a suitable example.",
      "Explain math module of Python with suitable example.",
      "Explain file handling basic Python function to open and close the text file.",
      "Explain to access string elements using index operator with a suitable example.",
      "Write a Python program that reads a text file and counts the occurrences of each alphabet in the file. The program should prompt the user to enter the filename.",
      "Explain the usage of given file handling methods in Python: read(), readline(), readlines().",
      "Explain usage of given string methods in Python: islower(), isupper(), isdigit(), isalnum()."
    ],
    "file2": [
      "Explain if-elif-else control structure in Python.",
      "Explain type casting in Python.",
      "Explain features of Python programming language.",
      "Write a program to calculate simple and compound interest.",
      "Explain for loop with example.",
      "Write a program to find the sum of following series.",
      "Write a program that find whether a given year is a leap year or not.",
      "List out different types of control statements in python and explain any one.",
      "Write a program to print following pattern.",
      "Explain below string functions: max, isalpha, islower, isspace, count, rfind and swapcase.",
      "Write a program to find the number of times an element occurs in the list.",
      "Differentiate between append() and extend() methods of list.",
      "Write an automated censor program that reads the text from a file and creates a new file where all of the four-letter words have been replaced by .",
      "Write syntax of if-else and nested if-else.",
      "Explain basic tuple operations with example.",
      "Write a program to randomly fill in 0s and 1s into a 4x4 2-dimension list, print the list and find the rows and columns with the most number of 1s.",
      "List out functions of datetime module.",
      "Write advantages of function in Python.",
      "Explain the creation of user defined module and procedure to import it in other program with example.",
      "Explain following functions: math.exp(), math.floor(), math.pow().",
      "Write a program to plot sine wave using matplotlib.",
      "List out various file accessing modes and explain each of them.",
      "List out functions for writing to file operation and explain each.",
      "Explain following string functions with example: endswith(), find()."
    ]
  },
  "blueprint": {
    "file1": {
      "Q1": {
        "topic": [
          "features and application of python",
          "input and output statements in python",
          "arithmetic operations in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q2": {
        "topic": [
          "if statement in python",
          "while loop in python",
          "patterns using loop concept in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q3": {
        "topic": [
          "set creation in python",
          "dictionary creation in python",
          "list operations in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q4": {
        "topic": [
          "built-in functions of python",
          "random module in python",
          "user-defined module in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q5": {
        "topic": [
          "file handling in python",
          "string operations in python"
        ],
        "marks": 7,
        "type": "theory"
      }
    },
    "file2": {
      "Q1": {
        "topic": [
          "if-elif-else control structure in Python",
          "type casting in Python",
          "features of Python programming language"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q2": {
        "topic": [
          "for loop with example",
          "sum of series",
          "leap year in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q3": {
        "topic": [
          "tuple operations in python",
          "random 2D list generation in python",
          "Fibonacci sequence in python"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q4": {
        "topic": [
          "dictionary operations in python",
          "list methods in python",
          "datetime module functions"
        ],
        "marks": 7,
        "type": "theory"
      },
      "Q5": {
        "topic": [
          "file handling modes in python",
          "file writing functions in python",
          "string functions in python"
        ],
        "marks": 7,
        "type": "theory"
      }
    }
  },
  "stats": {
    "total_questions": 45,
    "total_sections": 10,
    "totol_files":2
  }
}



function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledColors = shuffle([
  "#FF5733", "#33FF57", "#5733FF", "#FF9933", "#66FF33",
  "#3399FF", "#FF3399", "#FFFF33", "#33FFFF", "#9933FF",
  "#FF3366", "#66FF99", "#3399FF", "#FF99FF", "#FF3333",
  "#33FF66", "#9933FF", "#FF6633", "#33FF99", "#9933FF",
  "#FF3366", "#66FF99", "#3399FF", "#FF99FF", "#FF3333",
  "#33FF66", "#9933FF", "#FF6633", "#33FF99", "#9933FF",
  "#FF3366", "#66FF99", "#3399FF", "#FF99FF", "#FF3333",
  "#33FF66", "#9933FF", "#FF6633", "#33FF99", "#9933FF",
  "#FF3366", "#66FF99", "#3399FF", "#FF99FF", "#FF3333",
  "#33FF66", "#9933FF", "#FF6633", "#33FF99", "#9933FF",
  "#FF3366", "#66FF99", "#3399FF", "#FF99FF", "#FF3333",
  "#33FF66", "#9933FF", "#FF6633", "#33FF99", "#9933FF"
]);


let currentIndex = 0;

function getRandomColor() {
  if (currentIndex >= shuffledColors.length) {
      currentIndex = 0;
  }
  const color = shuffledColors[currentIndex];
  currentIndex++;
  return color;
}
export {resOptions,NUMBER_OF_PLANS ,pdfPerPlanIncreament,pyqPrompt,getRandomColor,resp};