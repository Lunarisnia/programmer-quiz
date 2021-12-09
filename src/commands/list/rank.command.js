'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getTopUsers } = require('../../services/answerings/userData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Display Top 10 High Ranking Players'),
	async execute(interaction) {
        const topUsers = await getTopUsers();
        let leaderBoard = '======TOP 10 PLAYERS======\n'
        for (let [index, topUser] of topUsers.entries()) {
            leaderBoard += `${index + 1}. ${topUser.name} : ${topUser.point} Poin\n`
        }
		return interaction.reply(leaderBoard);
	},
};