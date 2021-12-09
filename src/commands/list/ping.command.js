'use strict';
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! :) <3 <3'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};