// import OpenAI from 'openai';
// import { asyncHandler } from '../utils/asyncHandler.js';
// import { apiResponse } from '../utils/apiResponse.utils.js';
// import fs from 'fs';
// import { uploadOnCloudinary } from '../utils/cloudinary.utils.js';
// import { apiError } from '../utils/apiError.utils.js';
// import { Exam_details } from '../models/exam_details.models.js';
// import { User } from '../models/users.models.js';

// // Initialize OpenAI API with your API key

// const giveAnalayzedData = asyncHandler(async (req, res) => {
//     const { name, stream, course, help } = req?.body;
//     const { _id } = req.user;
//     const openai = new TODO:add class name of ();
//     if (!name || !stream || !course) throw new apiError(400, "Exam Name, Stream, and course are required!");
//     try {
//         let pdf_url = [];
      
//         // Upload all files to Cloudinary
//         await Promise.all(req.files.map(async (file) => {
//             const upload_url = await uploadOnCloudinary(file.path);
//             pdf_url.push(upload_url);
//             fs.unlink(file.path, (err) => {
//                 if (err) {
//                     console.error('Error deleting file:', err);
//                     return;
//                 }
//                 console.log('File deleted successfully');
//             });
//         }));

//         // Generate response using OpenAI API
//         const resp = await openai.complete({
//             engine: 'text-davinci-002',
//             prompt: 'Your prompt text here...',
//             maxTokens: 150,
//             temperature: 0.7
//             // Add more parameters as needed
//         });

//         // Handle the response from OpenAI

//         const colourCode = getRandomColor();
//         const uploadToDb = await Exam_details.create({
//             name: name,
//             subject: stream,
//             course: course,
//             pdf_url: pdf_url,
//             help: help,
//             color: colourCode,
//             data: JSON.stringify(resp)
//         });

//         if (!uploadToDb) throw new apiError(505, "Can't upload data!");
        
//         const usage = {
//             id: uploadToDb._id,
//             name: name,
//             color: colourCode,
//             createdAt: uploadToDb.createdAt
//         };

//         const addToUser = await User.findByIdAndUpdate(req.user._id, {
//             $push: {
//                 usage_history: JSON.stringify(usage)
//             }
//         }, {
//             validateBeforeSave: false,
//             new: true
//         }).select("-password");

//         return res.json(new apiResponse(200, {
//             name: name,
//             stream: stream,
//             resp: resp
//         }));

//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json(new apiResponse(500, 'Internal Server Error'));
//     }
// });

// const getDbAnalayzedData = asyncHandler(
//     async (req, res) => {
//         const { params } = req.body;

//         const data = await Exam_details.findById(params).select("data -_id")
//         console.log(data)
//         return res.json(
//             new apiResponse(200, data)
//         )
//     }
// )

// const getUsageHistory = asyncHandler(
//     async (req, res) => {
//         const userId = req.user._id;
//         const userInDb = await User.findById(userId).select("-password -refresh_token");
//         return res.json(
//             new apiResponse(200, {
//                 "usage": userInDb.usage_history
//             })
//         )
//     }
// )
// export { giveAnalayzedData,getUsageHistory,getDbAnalayzedData };
import OpenAI from 'openai';
import { getRandomColor, pyqPrompt } from '../constants.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.utils.js';
import fs from 'fs'
import { uploadOnCloudinary } from '../utils/cloudinary.utils.js';
import { apiError } from '../utils/apiError.utils.js';
import { Exam_details } from '../models/exam_details.models.js'
import { User } from '../models/users.models.js';




const giveAnalayzedData = asyncHandler(async (req, res) => {
    const { name, stream, course, help } = req?.body;
    const { _id } = req.user;
    const resp = {
        "imp_keywords": [
          "Operating System",
          "Operating System Services",
          "Multiprogramming O.S",
          "Multithreading O.S",
          "Process Life Cycles",
          "CPU bound process",
          "IO bound Process",
          "FCFS algorithm",
          "Deadlock",
          "Process Control Block",
          "RR algorithm",
          "Race Condition",
          "Mutual Exclusion",
          "Swapping",
          "Multiprogramming with Fixed Partitions",
          "External fragmentation",
          "Internal Fragmentation",
          "Address translation in paging",
          "Multiprogramming with Dynamic Partitions",
          "Physical structures of Hard disk",
          "Disk space allocation method",
          "File operation",
          "Directory related commands in Linux",
          "Shell script",
          "Linux architecture",
          "Linux Commands",
          "datetime module",
          "advantages of function in Python",
          "user-defined modules",
          "plotting sine wave using matplotlib",
          "file accessing modes",
          "file writing operations",
          "string functions"
        ],
        "topic_frequency": {
          "high": [
            "Operating System",
            "Process Life Cycles",
            "CPU bound process",
            "IO bound Process",
            "FCFS algorithm",
            "Process Control Block",
            "RR algorithm",
            "Deadlock",
            "Multiprogramming with Fixed Partitions",
            "Address translation in paging",
            "File operation",
            "Directory related commands in Linux",
            "Linux Commands",
            "file accessing modes",
            "file writing operations",
            "string functions"
          ],
          "less": [
            "Operating System Services",
            "Multiprogramming O.S",
            "Multithreading O.S",
            "Race Condition",
            "Mutual Exclusion",
            "Swapping",
            "External fragmentation",
            "Internal Fragmentation",
            "Multiprogramming with Dynamic Partitions",
            "Physical structures of Hard disk",
            "Disk space allocation method",
            "Shell script",
            "Linux architecture",
            "datetime module",
            "advantages of function in Python",
            "user-defined modules",
            "plotting sine wave using matplotlib"
          ]
        },
        "imp_qa": [
          "(a) What is Operating System? Explain needs of Operating System.",
          "(b) Explain Operating System Services.",
          "(c) Write shot note on: Multiprogramming O.S and Multithreading O.S.",
          "(a) Explain Process Life Cycles.",
          "(b) Explain CPU bound process and IO bound Process with example.",
          "(c) Calculate  Average  waiting  time  and  average  turnaround  time  for  FCFS  algorithm with gantt chart for following data.",
          "(a) What is deadlock? Explain four conditions for deadlock to occur.",
          "(b) Explain Process Control Block in detail.",
          "(c) Calculate Average waiting time and average turnaround time for RR algorithm with gantt chart for following data. Consider that the time quantum is 4ms.",
          "(a) Explain Race Condition.",
          "(b) Explain long term, medium term and short term schedulers.",
          "(c) Write a short note on memory relocation and protection.",
          "(a) Explain Mutual Exclusion in detail.",
          "(b) What is thread? Explain Benefits of using threads.",
          "(c) What is swapping? Explain with example.",
          "(a) Explain Multiprogramming with Fixed Partitions.",
          "(b) Differentiate: External fragmentation Vs Internal Fragmentation.",
          "(c) Explain address translation in paging.",
          "(a) Explain Multiprogramming with Dynamic Partitions.",
          "(b) Explain Physical structures of Hard disk.",
          "(c) Write a short not on the disk space allocation method.",
          "(a) Explain file operation in details.",
          "(b) Explain various directory related commands in Linux.",
          "(c) Write a shell script to find the maximum out of three numbers.",
          "(a) Explain Linux architecture in detail.",
          "(b) Explain following Linux Commands: chmod, ls, wc  cat."
        ],
        "exam_difficulty": {
          "bos_summer-2023.pdf": "easy",
          "bos_winter-2022.pdf": "easy"
        },
        "all_questions": {
          "bos_summer-2023.pdf": [
            "(a) What is Operating System? Explain needs of Operating System. (3 marks)",
            "(b) Explain Operating System Services. (4 marks)",
            "(c) Write shot note on: Multiprogramming O.S and Multithreading O.S. (7 marks)",
            "(a) Explain Process Life Cycles. (3 marks)",
            "(b) Explain CPU bound process and IO bound Process with example. (4 marks)",
            "(c) Calculate  Average  waiting  time  and  average  turnaround  time  for  FCFS  algorithm with gantt chart for following data. (7 marks)",
            "(a) What is deadlock? Explain four conditions for deadlock to occur. (3 marks)",
            "(b) Explain Process Control Block in detail. (4 marks)",
            "(c) Calculate Average waiting time and average turnaround time for RR algorithm with gantt chart for following data. Consider that the time quantum is 4ms. (7 marks)",
            "(a) Explain Race Condition. (3 marks)",
            "(b) Explain long term, medium term and short term schedulers. (4 marks)",
            "(c) Write a short note on memory relocation and protection. (7 marks)",
            "(a) Explain Mutual Exclusion in detail. (3 marks)",
            "(b) What is thread? Explain Benefits of using threads. (4 marks)",
            "(c) What is swapping? Explain with example. (7 marks)",
            "(a) Explain Multiprogramming with Fixed Partitions. (3 marks)",
            "(b) Differentiate: External fragmentation Vs Internal Fragmentation. (4 marks)",
            "(c) Explain address translation in paging. (7 marks)",
            "(a) Explain Multiprogramming with Dynamic Partitions. (3 marks)",
            "(b) Explain Physical structures of Hard disk. (4 marks)",
            "(c) Write a short not on the disk space allocation method. (7 marks)",
            "(a) Explain file operation in details. (3 marks)",
            "(b) Explain various directory related commands in Linux. (4 marks)",
            "(c) Write a shell script to find the maximum out of three numbers. (7 marks)",
            "(a) Explain Linux architecture in detail. (3 marks)",
            "(b) Explain following Linux Commands: chmod, ls, wc  cat. (4 marks)"
          ],
          "bos_winter-2022.pdf": [
            "(a) Explain what is operating system services? (3 marks)",
            "(b) Enlist   all   types   of   OS   and   enlist   advantages   and   disadvantages   of multiprocessing OS (4 marks)",
            "(c) Draw  state  transition  diagram  and  explain  all  the  states  with  its  possible transition scenario. (7 marks)",
            "(c) Draw diagram of PCB. Explain each component of PCB. (7 marks)",
            "(a) Explain Batch Processing operating system with diagram. (3 marks)",
            "(b) Calculate Average Waiting time and Average TAT Using FCFS algorithm for given schedule: (4 marks)",
            "(c) Enlist  all  the  condition  for  deadlock  to  happen  and  describe  Race  condition with example. (7 marks)",
            "(a) Explain Network operating system with diagram. (3 marks)",
            "(b) Calculate  Average  Waiting  time  and  Average  TAT  Using  Shortest  Job  Next  algorithm for given schedule: (4 marks)",
            "(c) Describe Semaphore types and its operation. (7 marks)",
            "(a) Differentiate Preemptive scheduling with Non-preemptive scheduling. Give at least 3 differences. (3 marks)",
            "(b) Write short note on segmentation. (4 marks)",
            "(c) Describe what is paging? Explain TLB with diagram. (7 marks)",
            "(a) Explain context switch in brief. (3 marks)",
            "(b) Write short note on Fragmentation. (4 marks)",
            "(c) Enlist all partition selection strategies and explain it with example. (7 marks)",
            "(a) Describe physical structure of Disk. (3 marks)",
            "(b) Explain  multiple  programming  with  fixed  size  partition.  Implement  it  using example. (4 marks)",
            "(c) Enlist all disk scheduling algorithm and explain FCFS with example. (7 marks)",
            "(a) Describe logical structure of Disk. (3 marks)",
            "(b) Explain  multiple  programming  with  dynamic  size  partition.  Implement  it using example. (4 marks)",
            "(c) Enlist  all  disk  scheduling  algorithm  and  explain  Elevator  algorithm  with example. (7 marks)",
            "(a) Enlist all directory related commands and explain ls command with options. (3 marks)",
            "(b) Explain GREP command with example. (4 marks)",
            "(c) Write a shellscript to find sum of all individual digits in given 5 digit numbers. (7 marks)",
            "(a) Enlist  atleast  6  file handling commands  and  explain cmp  command with example. (3 marks)",
            "(b) Explain CHMOD command with example. (4 marks)"
          ]
        },
        "blueprint": {
          "Q1": "this question is bases on theory / mcq ,having 3 questions"
        }
      }
      
    if (!name || !stream || !course) throw new apiError(400, "Exam Name , Stream and course are required !");
    try {
        let pdf_url = [];
      
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


        const colourCode = getRandomColor()
        const uploadToDb = await Exam_details.create(
            {
                name: name,
                subject: stream,
                course: course,
                pdf_url: pdf_url,
                help: help,
                color: colourCode,
                data: JSON.stringify(resp)
            }
        )
        if (!uploadToDb) throw new apiError(505, "can't upload data !");
        const usage = {
            id: uploadToDb._id,
            name: name,
            color: colourCode,
            createdAt: uploadToDb.createdAt
        }
        const addToUser = await User.findByIdAndUpdate(req.user._id, {
            $push: {
                usage_history: JSON.stringify(usage)
            },

        }, {
            validateBeforeSave: false,
            new: true
        }).select("-password")
        return res.json(new apiResponse(200,
            {
                id: uploadToDb._id,
                name: name,
                stream: stream,
                resp: resp,
            }
        ));
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(new apiResponse(500, 'Internal Server Error'));
    }
});

const getDbAnalayzedData = asyncHandler(
    async (req, res) => {
        const { params } = req.body;

        const data = await Exam_details.findById(params).select("data -_id")
        console.log(data)
        return res.json(
            new apiResponse(200, data)
        )
    }
)


const getUsageHistory = asyncHandler(
    async (req, res) => {
        const userId = req.user._id;
        const userInDb = await User.findById(userId).select("-password -refresh_token");
        return res.json(
            new apiResponse(200, {
                "usage": userInDb.usage_history
            })
        )
    }
)

export { giveAnalayzedData, getDbAnalayzedData, getUsageHistory }