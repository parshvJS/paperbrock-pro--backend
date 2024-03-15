import openai from 'openai';
// const apiKey = process.env.CHATGPT_API;
// const openai = new openai(apiKey);


// function that takes one question and gives response
async function getChatGPTResponse(question) {
    // const prompt = `Q ${question}\n`;

    // // Call the OpenAI API to generate a response
    // const response = await openai.complete({
    //     engine: 'davinci-codex', // You can choose any other suitable engine
    //     prompt: prompt,
    //     maxTokens: 100, // Adjust maxTokens as needed
    // });

    // // Extract and return the generated response
    // return response.data.choices[0].text.trim();


    return "This JSON object contains a single choice, which is the generated text based on the provided prompt. The text provides an explanation of how to create a dictionary in Python and how to concatenate two dictionaries into a new one, along with example Python code snippets."
}

// async function sendPromptAndGetResponse(prompt) {

//     const response = await openaiInstance.createChatCompletion({
//         model: 'davinci-codex',
//         prompt: prompt,
//         max_tokens: 100,
//     });

//     // Extract and return the generated response
//     return response.data.choices[0].text.trim();
// }



export { getChatGPTResponse };
