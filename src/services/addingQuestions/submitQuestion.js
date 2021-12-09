'use strict';
const { processQuestion, generateBoilerplate } = require("./questionProcessor");
const { addQuestion } = require("./storeQuestion");

const { TARGET_CHANNEL_ID } = process.env;


module.exports = async (client, message) => {
    const questionAnswer = processQuestion(message.content);

    const questionInfo = await addQuestion(questionAnswer);
    const boilerplatedQuestion = generateBoilerplate(questionInfo);
    
    // Send the question to the channel and notify the user
    await client.channels.cache.get(TARGET_CHANNEL_ID).send(boilerplatedQuestion);
    await message.reply('Question Posted!');
}