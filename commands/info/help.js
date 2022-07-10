// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json');


// Constants
var prefix = config.prefix;

// module

module.exports = {
	name: 'help',
	category: 'Info',
	usage: '%help',
	image: 'https://images-ext-1.discordapp.net/external/tfonJdT1H0-LDWlrKsgUuYt5FTRts49Amcb16g5nb10/%3Fsize%3D8192/https/media.discordapp.net/attachments/787492478860656660/788184223109873734/unknown.png',
	description: 'Help Command',
	run: async (client, message, args, cmd) => {
		if(!args[0]) {

			message.delete();

			

			const DmEmbed = new MessageEmbed()
				.setAuthor({name: 'Help Command!'})
				.setColor('LUMINOUS_VIVID_PINK')
				.setThumbnail(message.guild.iconURL({ size: 4096 }))
				.setDescription(`These are the avaliable Commands for the WoolWars Bot!\nThe bot prefix is: w!
				
				**Commands:**`)
				.addField('Leaderboards', '``w!lbwins`` ``w!lbkills`` ``w!lbassist`` ``w!lbbb`` ``w!lbbp`` ``w!lbpower``')
				.addField('General', '``w!help [COMMAND]`` ``w!botinfo`` ``w!profile`` ``w!suggest``')
				.setTimestamp()
				

			
			message.channel.send({ embeds: [DmEmbed] }).catch(() => message.channel.send({ embeds: [DmEmbed] }).then(m => { m.delete({ timeout: 10000 });}));

		}

		if(message.content == 'w!help help') return message.channel.send('Just do **w!help** instead.');

		if(args[0]) {
			let command = client.commands.get(args[0]);
			if(!command) command = client.commands.get(client.aliases.get(args[0]));
			if(!command) return;
			if(command.category === 'dev') return;

			const CHEmbed = new MessageEmbed()
				.setAuthor({name: 'WoolWars Bot Help'})
				.setColor(colours.CHB)
				.setThumbnail(command.image || client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setDescription(`The bot prefix is: w!\n\n**Command:** ${command.name}\n**Description: **${command.description || 'No Description'}\n**Usage: **${command.usage || 'No Usage'}\n**Aliases: **${command.aliases || 'No Aliases'}\n**Requirements: **\`\`${command.requirements}\`\``)
				.setFooter(`Requested By ${message.author.tag} • WoolWars`)
				.setTimestamp();
			message.channel.send({ embeds: [CHEmbed] });

		}


		return;

	},

};