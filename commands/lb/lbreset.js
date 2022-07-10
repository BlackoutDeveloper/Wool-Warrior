// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/player')
const maca = require('mcdata')
const mch = require('minecraft_head')
const mcp = require('minecraft-player')
const apit = require('@zikeji/hypixel')
const clementine = new apit.Client("d1288f02-a6f1-4765-99ff-82b327026d2e")
// module

module.exports = {
	name: 'lbrefresh',
	category: 'leaderboards',
	usage: 'w!lbrefresh',
	image: '',
	requirements: ['STAFF'],
	description: '',
	run: async (client, message, args) => {
        const memberi = message.guild.members.cache.get(message.author.id)
        if (memberi.id !== '350954110654087169') return message.channel.send('No <3')
        
        const bp = client.commands.get('bplbupdate')
        const bb = client.commands.get('bblbupdate')
        const power = client.commands.get('powerlbupdate')
        const wins = client.commands.get('wlbupdate')
        const kills = client.commands.get('klbupdate')
        const assist = client.commands.get('albupdate')
        bp.run(client, message, args)
        bb.run(client, message, args)
        power.run(client, message, args)
        wins.run(client, message, args)
        kills.run(client, message, args)
        assist.run(client, message, args)
        message.channel.send('Leaderboards Recounted')
	},
};

