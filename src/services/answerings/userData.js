'use strict';

const { firestoreDb } = require("../../configs/firebase");

// Fetch 10 user on the database ordered by highest point
const getTopUsers = async () => {
    const raw = await firestoreDb.collection('users').orderBy('point', 'desc').limit(10).get();
    const docs = raw.docs.map(doc => doc.data());

    return docs;
}

const addNewUser = async (authorId, point, answeredQuestionId) => {
    const userData = {
        id: authorId,
        point: point,
        answeredQuestionIds: [],
    }
    userData.answeredQuestionIds.push(answeredQuestionId);
    await firestoreDb.collection('users').doc(authorId.toString()).set(userData);
}

// Fetch A single user with an ID
const getOneUser = async (userId) => {
    const raw = await firestoreDb.collection('users').doc(userId).get();
    return raw.data();
}

const updateUserData = async (authorId, point, answeredQuestionId) => {
    const userData = await getOneUser(authorId);
    
    userData.point += point;
    userData.answeredQuestionIds.push(answeredQuestionId);
    await firestoreDb.collection('users').doc(authorId.toString()).set(userData);
}

const checkIfUserExist = async (userId) => {
    if(await getOneUser(userId))  
        return true;
    else return false;
}

const checkIfUserHasAnswered = async (userId, questionId) => {
    const userData = await getOneUser(userId);
    return userData.answeredQuestionIds.includes(questionId);
}

module.exports = { addNewUser, updateUserData, checkIfUserExist, checkIfUserHasAnswered, getTopUsers, getOneUser }