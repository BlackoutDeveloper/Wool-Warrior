// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'lfp',
	category: 'misc',
	usage: 'w!lfp',
	image: '',
	requirements: ['NONE'],
	description: 'Sends a ping for the LFP role',
	run: async (client, message, args) => {
        if (message.channel.id !== '953439186617241611' && message.channel.id !== '962716121721626704') return message.channel.send('Incorrect Channel For That Command')
        let sugge = args.join(' ')
        message.channel.send(`<@&953452602467680368> <@${message.author.id}> : ${sugge}`)
	},
};

