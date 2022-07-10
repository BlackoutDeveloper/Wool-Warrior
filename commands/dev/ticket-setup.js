

// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, MessageActionRow, MessageButton, MessageCollector, Permissions, Message } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'ts',
	category: 'dev',
	usage: 'w!ts [CHANNEL]',
	image: '',
	requirements: ['DEVELOPER'],
	description: 'Sets Up The Ticket System',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        
        if (!roles && message.author.id !== '350954110654087169') return;
        const chanel = message.mentions.channels.first()
        if (!chanel) return message.channel.send('...what channel?')
        const embedi = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setTitle('Tickets!')
            .setDescription('General Support: Media submissions, Bug reports, Partnership requests, any support you need.\n\nReport A User: If you find a user is breaking any of the rules of the server you can report them here.\n\nAbuse of any of these features will result in banning from tickets and possibly from the server.')
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Support Ticket')
                .setCustomId('support'),
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('Report A User')
                .setCustomId('report')
        )
        const msg = await chanel.send({ embeds: [embedi], components: [row] })
        message.delete()
    }

    
};

