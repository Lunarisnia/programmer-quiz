'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getOneQuestion } = require('../../services/addingQuestions/fetchQuestion');
const { generateBoilerplate } = require('../../services/addingQuestions/questionProcessor');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Show Quiz of Choice to the chat')
        .addIntegerOption(option => option.setName('quiz_id').setDescription('Enter a Quiz Id')),
    async execute(interaction) {
        const question = await getOneQuestion(`${interaction.options.getInteger('quiz_id')}`);
        if(!question) {
            return interaction.reply(`Quiz ID: ${interaction.options.getInteger('quiz_id')} tidak ditemukan.`);
        }
        return interaction.reply(generateBoilerplate(question));
    },
};