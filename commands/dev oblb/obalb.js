// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'albupdate',
	category: 'dev',
	usage: 'NONE',
	image: '',
	requirements: ['BOT'],
	description: 'Dont run it',
	run: async (client, message, args) => {
        const mella = client.channels.cache.get('956325906002108466')
        
        mella.bulkDelete(1)
        const runne = client.commands.get('oblba')
        runne.run(client, message, args)
	},
};

