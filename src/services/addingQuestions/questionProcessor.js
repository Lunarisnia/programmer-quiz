'use strict';
// Split the command to obtain question, answer, point
/**
 *  !question
 *  ```
 *  // LANG: Python
 *  print('a')
 *  print('b')
 *  ```
 *  !answer
 *  a
 *  b
 *  !point 5
 */
const processQuestion = (rawMessage) => {
    let rawQuestion = rawMessage.split('!question');
    rawQuestion = rawQuestion[rawQuestion.length - 1].split('!answer');
    let processedQuestion;
    let processedAnswer;
    let pointAmount;
    for (let text of rawQuestion) {
        if (text.includes('// LANG:')) {
            processedQuestion = text
        } else {
            const splittedAnswer = text.split('!point ');
            processedAnswer = splittedAnswer.shift();
            pointAmount = splittedAnswer.shift();
        }
    }
    return { question: processedQuestion, answer: processedAnswer, point: parseInt(pointAmount) };
}

const generateBoilerplate = (questionInfo) => {
    return `
---------------Tebak Output---------------
Quiz ID: \`${questionInfo.id}\`
Point: \`${questionInfo.point}\`
    
Code: 
${questionInfo.value}

Guess The Output!
----------------Good Luck----------------
`;
}

module.exports = { processQuestion, generateBoilerplate };