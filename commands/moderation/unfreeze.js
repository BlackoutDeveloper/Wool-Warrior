// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'unfreeze',
	category: 'moderation',
	usage: 'w!unfreeze @user',
	image: '',
	requirements: ['MODERATOR'],
	description: 'Freeze A User',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        const staffcheck = membero.roles.cache.get('960214870014443540')
        if (!staffcheck) return message.channel.send(`You don't have permission!`)
        if (message.mentions.members.size !== 1) return message.channel.send('Mention the user and only the user')
        const memberi = message.mentions.members.first()
        const freezerole = message.guild.roles.cache.find(r => r.id === '958847332974223390')
        const memberrole = message.guild.roles.cache.find(r => r.id === '954518744938446908')
        memberi.roles.remove(freezerole)
        memberi.roles.add(memberrole)
        message.channel.send(`Thawed Out ${memberi.user.tag}`)
	},
};

