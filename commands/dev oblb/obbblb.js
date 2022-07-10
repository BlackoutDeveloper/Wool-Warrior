// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'bblbupdate',
	category: 'dev',
	usage: 'NONE',
	image: '',
	requirements: ['BOT'],
	description: 'Dont run it',
	run: async (client, message, args) => {
        const mella = client.channels.cache.get('953442903630430228')
        
        mella.bulkDelete(1)
        const runne = client.commands.get('oblbbb')
        runne.run(client, message, args)
	},
};

