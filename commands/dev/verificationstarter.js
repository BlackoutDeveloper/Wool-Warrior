// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json')
// module

module.exports = {
	name: 'beginverify',
	category: 'dev',
	usage: 'w!beginverify',
	image: '',
	requirements: ['DEV'],
	description: '',
	run: async (client, message, args) => {
        if (message.author.id !== config.owner) return;
        const chid = '954521110001647656'
        
        const chan = message.guild.channels.cache.get(chid)
        let verif = new MessageEmbed()
            .setTitle('Verification')
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription('Verify and accept the rules with the sparkly green button.')
        const verifrow = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Verify!')
                .setCustomId('verifierbutton')
        )
        chan.send({ embeds: [verif], components: [verifrow] })
	},
};

