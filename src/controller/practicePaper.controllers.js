import { Exam_details } from "../models/exam_details.models.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// function extract content from exam_details model for specific user ,extract blueprint from data field ,count files ,question , topics and return with name and colour in array.

// used in  route  : getPracticeUsage

export const getPracticeUsage = asyncHandler(
    async (req, res) => {
        const userId = req.user._id;
        let practiceItem = [];
        const practiceUsageArr = await Exam_details.find({
            id: userId
        });
        practiceUsageArr.forEach(usage => {
            const blueprint = JSON.parse(usage.data).blueprint;
            console.log(blueprint, "is here");

            const totalFiles = Object.keys(blueprint).length;

            let totalCountTopics = 0;
            for (const file in blueprint) {
                for (const question in blueprint[file]) {
                    totalCountTopics += blueprint[file][question].topic.length;
                }
            }

            let countQuestions = 0;
            for (const file in blueprint) {
                countQuestions += Object.keys(blueprint[file]).length;
            }

            const item = {
                id: usage._id,
                name: usage.name,
                color: usage.color,
                totalFile: totalFiles,
                totalTopics: totalCountTopics,
                totalQuestion: countQuestions
            }
            practiceItem.push(item)
        })
        return res.json(new apiResponse(200, { array: practiceItem }))
    }
)

export const getUsageBluePrint = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userExamDetails = await Exam_details.find({ id: userId });
    let fileNodes = {
    };

    userExamDetails.forEach((usage, index) => {
        const blueprint = JSON.parse(usage.data).blueprint;
        Object.keys(blueprint).forEach((fileName, fileIndex) => {
            if (!fileNodes[fileName]) {
                fileNodes[fileName] = { nodes: [], edges: [] };
                // Create node for file
                const fileNode = {
                    id: `file-${index}-${fileIndex}`,
                    type: 'custom',
                    data: { name: fileName,IsQuestion:false },
                    position: { x: 50, y: 400 } // Adjust position as needed
                };
                fileNodes[fileName].nodes.push(fileNode);

                // Create nodes and edges for questions and topics
                Object.keys(blueprint[fileName]).forEach((questionKey, questionIndex) => {
                    const question = blueprint[fileName][questionKey];
                    const questionNode = {
                        id: `question-${index}-${fileIndex}-${questionIndex}`,
                        type: 'custom',
                        data: { name: questionKey, total_marks: question.marks, type: question.type,IsQuestion:true },
                        position: { x: 150 + 100 /** questionIndex*/, y: 80 + 150 * questionIndex } // Adjust position as needed
                    };
                    fileNodes[fileName].nodes.push(questionNode);

                    // Connect file node to question node
                    const edge = {
                        id: `edge-${index}-${fileIndex}-${questionIndex}`,
                        source: fileNode.id,
                        sourceHandle: 'source',
                        target: questionNode.id,
                        targetHandle: 'target'
                    };
                    fileNodes[fileName].edges.push(edge);

                    // Create nodes and edges for topics
                    question.topic.forEach((topic, topicIndex) => {
                        const topicNode = {
                            id: `topic-${index}-${fileIndex}-${questionIndex}-${topicIndex}`,
                            type: 'custom',
                            data: { name: topic,IsQuestion:false },
                            position: { x: 350 + 250 /* * topicIndex */, y: 200 * questionIndex + 50 * topicIndex } // Adjust position as needed
                        };
                        fileNodes[fileName].nodes.push(topicNode);

                        // Connect question node to topic node
                        const topicEdge = {
                            id: `edge-${index}-${fileIndex}-${questionIndex}-${topicIndex}`,
                            source: questionNode.id,
                            sourceHandle: 'source',
                            target: topicNode.id,
                            targetHandle: 'target'
                        };
                        fileNodes[fileName].edges.push(topicEdge);
                    });

                });
            }

        });
    });
    console.log(Object.keys(fileNodes).length)
    return res.json(new apiResponse(200, fileNodes))
    // Now you have fileNodes object organized by file names
});


