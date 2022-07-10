// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/player')
// module

module.exports = {
	name: 'ign',
	category: 'profile',
	usage: 'w!ign @user',
	image: '',
	requirements: ['NONE'],
	description: 'Shows the ign of the user mentioned',
	run: async (client, message, args) => {
        if (message.mentions.members.size !== 1) return message.channel.send(`It's w!ign @[USER]`)
        const membero = message.mentions.members.first()
        const data = await profileModel.findOne({ userID: membero.id})
        if (!data) return message.channel.send('No Data Found For That User')
        if (!data.ign) return message.channel.send('No Data Found For That User')
        return message.channel.send(`${data.ign}`)
	},
};

