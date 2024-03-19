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
import { getRandomColor, pyqPrompt, resp } from '../constants.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.utils.js';
import fs from 'fs'
import { uploadOnCloudinary } from '../utils/cloudinary.utils.js';
import { apiError } from '../utils/apiError.utils.js';
import { Exam_details } from '../models/exam_details.models.js'
import { User } from '../models/users.models.js';
import { count } from 'console';


const giveAnalayzedData = asyncHandler(async (req, res) => {
  const { name, stream, course, help } = req?.body;
  const { _id } = req.user;


  if (!name || !stream || !course) throw new apiError(400, "Exam Name , Stream and course are required !");
  try {
    let pdf_url = [];

    // Upload all files to Cloudinary
    await Promise.all(req.files.map(async (file) => {
      const upload_url = await uploadOnCloudinary(file.path);
      pdf_url.push(upload_url);
      fs.unlink(file.path, (err) => {
        if (err) {
          return;
        }
      });
    }));


    const colourCode = getRandomColor()
    const uploadToDb = await Exam_details.create(
      {
        id:_id,
        name: name,
        subject: stream,
        course: course,
        pdf_url: pdf_url,
        help: help,
        color: colourCode,
        data: JSON.stringify(resp) //TODO: get resp from gpt
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