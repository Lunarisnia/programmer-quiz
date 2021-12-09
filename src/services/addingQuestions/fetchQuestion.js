'use strict';
const { firestoreDb } = require("../../configs/firebase");

// Fetch all question on the database
const getAllQuestion = async () => {
    const raw = await firestoreDb.collection('questions').get();
    const docs = raw.docs.map(doc => doc.data());

    return docs;
}


// Fetch A single question with an ID
const getOneQuestion = async (id) => {
    const raw = await firestoreDb.collection('questions').doc(id).get();
    return raw.data();
}

module.exports = { getAllQuestion, getOneQuestion }