// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, Permissions } = require('discord.js');
const colours = require('../../configs/colours.json');
const guild = require('../../schemas/guild');
const ticketSchema = require('../../schemas/ticket.js')
const mongoose = require('mongoose')
// module
let tickmember = 0
module.exports = {
	name: 'claim',
	category: 'tickets',
	usage: 'w!claim',
	image: '',
	requirements: ['MOD'],
	description: 'Allows an admin or moderator to claim a ticket',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        try {
            const daticket = await ticketSchema.findOne({ ChannelID: message.channel.id })
            tickmember = message.guild.members.cache.get(daticket.UserID)
            console.log(daticket)
        }
        catch{
            return message.channel.send('No Ticket Found In Database')
        }
        const staffcheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'all staff')
        if (!staffcheck) return message.channel.send(`You Don't Have Permission!`)
        if (message.channel.name.startsWith('support')) {
            const chanel = message.guild.channels.cache.get(message.channel.id)
            const admincheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
            const modcheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'moderator')
            if (!tickmember) {
                return message.channel.send('No User Found')
            }
            if (admincheck) {
                chanel.permissionOverwrites.set([
                    {
                        id: message.guild.id, 
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: tickmember.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                    }
                ])
                let adminclaim = new MessageEmbed()
                    .setTitle(`Claimed By ${message.author.tag}`)
                    .setDescription('Other admins do not touch without express permission as it **may** be important')
                    .setColor('DARK_GOLD')
                return message.channel.send({ embeds: [adminclaim] })
            }
            else if (modcheck) {
                chanel.permissionOverwrites.set([
                    {
                        id: message.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: message.author.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY]
                    }
                ]);
                let modclaim = new MessageEmbed()
                    .setTitle(`Claimed By ${message.author.tag}`)
                    .setDescription('Admins do not touch without express permission as it **may** be important')
                    .setColor('DARK_GOLD')
                return message.channel.send({ embeds: [modclaim] })
            }
        }
        else if (message.channel.name.startsWith('report')) {
            const chanel = message.guild.channels.cache.get(message.channel.id)
            const admincheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
            const modcheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'moderator')
            const sscheck = membero.roles.cache.find(r => r.name.toLowerCase() === 'screenshare team')
            if (admincheck) {
                chanel.permissionOverwrites.set([
                    {
                        id: message.guild.id, 
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                ])
                let adminclaim = new MessageEmbed()
                    .setTitle(`Claimed By ${message.author.tag}`)
                    .setDescription('Other admins do not touch without express permission as it **may** be important')
                    .setColor('DARK_GOLD')
                return message.channel.send({ embeds: [adminclaim] })
            }
            else if (modcheck) {
                chanel.permissionOverwrites.set([
                    {
                        id: message.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: message.author.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY]
                    }
                ])
                let modclaim = new MessageEmbed()
                    .setTitle(`Claimed By ${message.author.tag}`)
                    .setDescription('Admins do not touch without express permission as it **may** be important')
                    .setColor('DARK_GOLD')
                return message.channel.send({ embeds: [modclaim] })
            }
            else if (sscheck) {
                let sser = message.guild.roles.cache.get('959822042721558538')
                chanel.permissionOverwrites.set([
                    {
                        id: message.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: sser.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY]
                    }
                ])
                let modclaim = new MessageEmbed()
                    .setTitle(`Claimed By ${message.author.tag}`)
                    .setDescription('Admins do not touch without express permission or necessity as it **may** be important')
                    .setColor('DARK_GOLD')
                return message.channel.send({ embeds: [modclaim] })
            }
        }
	},
};

