import { Stream } from "../models/admin/streams.models.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const insertNewStream = asyncHandler(
    async (req, res) => {
        const data = req.body;
        if (!data) throw new apiError(404, "Please Provide Data !");

        const ExistingData = await Stream.find();
        if (ExistingData.name == data) throw new apiError(404, "Entered stream already exist !");

        const DB = await Stream.create({
           data
        })
        if (!DB) throw new apiError(505, "Can't Insert Stream right now !")

        return res.status(200).json(new apiResponse(200, {}, "stream added successfully !"));
    }
)

const getAllStreams = asyncHandler
    (
        async (req, res) => {
            const data = await Stream.find();
            if (!data) throw new apiError(404, "can't fetch streams right now ! ");

            return res.json(new apiResponse(200, {
                data: data
            }, "streams fetched successfully !"));

        }
    )

export
{
    insertNewStream,
    getAllStreams
}