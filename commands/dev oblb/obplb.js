// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'bplbupdate',
	category: 'dev',
	usage: 'NONE',
	image: '',
	requirements: ['BOT'],
	description: 'Dont run it',
	run: async (client, message, args) => {
        const mella = client.channels.cache.get('953442860831764550')
        
        mella.bulkDelete(1)
        const runne = client.commands.get('oblbbp')
        runne.run(client, message, args)
	},
};

