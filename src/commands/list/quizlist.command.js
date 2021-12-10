'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getAllQuestion } = require('../../services/addingQuestions/fetchQuestion');
const { getOneUser } = require('../../services/answerings/userData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quizlist')
		.setDescription('Replies to you via DM informing you all question id list and the status'),
	async execute(interaction) {
        const userData = await getOneUser(interaction.user.id.toString());
        const allQuizId = (await getAllQuestion()).map(doc => doc.id);
        let list = '=====QUESTION ID LIST=====\n';

        for (let [index, id] of allQuizId) {
            if(userData.includes(id)) {
                list += `${index + 1}. \`ID: ${id}\`\n`
            }
        }
        await interaction.user.send(list);
        await interaction.reply('Ok');
		return interaction.deleteReply();
	},
};