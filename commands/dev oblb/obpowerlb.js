// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'powerlbupdate',
	category: 'dev',
	usage: 'NONE',
	image: '',
	requirements: ['BOT'],
	description: 'Dont run it',
	run: async (client, message, args) => {
        const mella = client.channels.cache.get('953442959754395708')
        
        mella.bulkDelete(1)
        const runne = client.commands.get('oblbpower')
        runne.run(client, message, args)
	},
};

