'use strict';
const { firestoreDb } = require("../../configs/firebase");
const { getAllQuestion } = require('./fetchQuestion');

// Add New Question to database
const addQuestion = async (question) => {
    const questions = await getAllQuestion();
    const data = {
        id: questions.length.toString(),
        value: question.question,
        answer: question.answer,
        point: question.point
    }

    await firestoreDb.collection('questions').doc(questions.length.toString()).set(data);
    return data;
}

module.exports = { addQuestion }