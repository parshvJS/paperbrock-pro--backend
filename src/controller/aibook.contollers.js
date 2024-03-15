import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getChatGPTResponse } from "../utils/chatgpt.utils.js";

const getUserAnswers = asyncHandler(
    async (req, res) => {
        const { questions } = req.body;
        // if (!questions || questions.length == 0) return res.json(new apiError(404, "Enter Minimum 1 Question !"))
        const responses = {};
        for (const question of questions) {
            const response = await getChatGPTResponse(question);
            responses[question] = response;
        }

        return res.json(
            new apiResponse(200, responses)
        );
    }
);

export {
    getUserAnswers
};
