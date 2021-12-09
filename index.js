'use strict';
// Require the necessary discord.js classes
require('dotenv').config();
const { Client, Intents, Formatters, Collection } = require('discord.js');
const { BOT_TOKEN, TARGET_CHANNEL_ID, QUESTION_PROVIDER_ID, GUILD_ID } = process.env;
const path = require('path');
const fs = require('fs');
const submitQuestion = require('./src/services/addingQuestions/submitQuestion');
const { channel } = require('diagnostics_channel');
const submitAnswer = require('./src/services/answerings/submitAnswer');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

// Read all command files dynamically
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'src', 'commands', 'list')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'src', 'commands', 'list', file));
    client.commands.set(command.data.name, command);
}


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Bot is running!');
});

// Handle DM On the bot for Giving question
client.on("messageCreate", async (message) => {
    if (message.author.bot || (message.author.id != QUESTION_PROVIDER_ID && message.channel.type === 'DM')) return;

    try {
        if (message.channel.type === 'DM') {
            await submitQuestion(client, message);
        } else if (message.channelId === TARGET_CHANNEL_ID) {
            if(!message.content.startsWith('!answer')) return message.delete();
            await submitAnswer(client, message);
        }
    } catch (error) {
        console.log(error);
        await message.reply('Question Posting Error: Question has not been posted, Please try again.');
    }
});


// Handle Main Bot event
client.on('interactionCreate', async interaction => {
    const { channelId } = interaction;
    if (!interaction.isCommand()) return;
    if (channelId != TARGET_CHANNEL_ID)
        return await interaction.reply(`This command is only allowed in ${Formatters.channelMention(TARGET_CHANNEL_ID)}`);

    // Check if the command typed actually has a logic
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    interaction.guild.members.cache.get();
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(BOT_TOKEN);