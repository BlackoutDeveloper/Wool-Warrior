// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'text',
	category: 'dev',
	usage: 'w!text [TEXT]',
	image: '',
	requirements: ['STAFF'],
	description: '',
	run: async (client, message, args) => {
        const memberi = message.guild.members.cache.get(message.author.id) //gets member
        const rmodcheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'moderator') //checks staff perms
        const radmincheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        if (!radmincheck && !rmodcheck) return message.channel.send('You don\'t have permission for that!');
        const texts = message.content.slice('6').trim() // gets the message without prefix
        message.channel.send(`${texts}`) //sends the message from the bot
        message.delete()
	},
};

