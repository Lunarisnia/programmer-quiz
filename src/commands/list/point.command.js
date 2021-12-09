'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getOneUser } = require('../../services/answerings/userData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('point')
		.setDescription('Show your own point'),
	async execute(interaction) {
        const userData = await getOneUser(interaction.member.id);
		return interaction.reply(`<@${userData.id}> Poin Anda: ${userData.point}`);
	},
};