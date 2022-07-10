// requirements
const { Collection, Client, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const { Discord } = require('discord.js');
const colours = require('../../configs/colours.json');


// module

module.exports = {
	name: 'botinfo',
	category: 'info',
	usage: 'w!botinfo',
	image: '',
	requirements: ['NONE'],
	description: 'Gives Information Of The Bot',
	run: async (client, message, args) => {
		message.delete();
		
		
		const embed = new MessageEmbed()
			.setColor('LUMINOUS_VIVID_PINK')
			.setTitle('Wool Wars Bot')
			.setDescription('The Wool Wars Bot')
			.setThumbnail(message.guild.iconURL({ size: 4096 }))
			.addField('Owner', '<@350954110654087169>')
			.addField('Version', '2.2.4')
			.addField('Language', 'Javascript')
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};

