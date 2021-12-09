'use strict';

const { getOneQuestion } = require("../addingQuestions/fetchQuestion");
const { addNewUser, checkIfUserExist, updateUserData, checkIfUserHasAnswered } = require("./userData");
const { TARGET_CHANNEL_ID } = process.env;

module.exports = async (client, message) => {
    const splittedAnswer = message.content.split('\n');
    const questionId = splittedAnswer.shift().split(' ')[1];
    const question = await getOneQuestion(questionId);
    const authorId = message.author.id;
    if (!question) {
        return client.channels.cache.get(TARGET_CHANNEL_ID).send(`<@${authorId}> Question Not Found!, Please make sure ID is valid.`);
    }

    // \n need to be appended on either side to exactly match the format
    const joinedAnswer = '\n' + splittedAnswer.join('\n') + '\n';

    const isUserExist = await checkIfUserExist(authorId);
    let hasAnswered = false;
    if(isUserExist)
        hasAnswered = await checkIfUserHasAnswered(authorId, questionId);
    
    if(hasAnswered) {
        return client.channels.cache.get(TARGET_CHANNEL_ID).send(`<@${authorId}> Anda Telah Menjawab Quiz ID: ${questionId} sebelumnya. Pilih Quiz Lain!`);
    }
    
    if (joinedAnswer === question.answer) {
        if(isUserExist)
            await updateUserData(authorId, question.point, questionId);
        else await addNewUser(authorId, question.point, questionId);

        await client.channels.cache.get(TARGET_CHANNEL_ID).send(`<@${authorId}> Telah Menjawab Quiz ID: ${questionId} dengan benar! Anda dapat ${question.point} poin`);
    } else {
        // await message.delete();
        await client.channels.cache.get(TARGET_CHANNEL_ID).send(`<@${authorId}> Jawaban Anda Pada Quiz ID: ${questionId} Salah. :(`);
    }
}