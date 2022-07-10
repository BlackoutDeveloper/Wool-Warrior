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
	name: 'lbkillsadd',
	category: 'leaderboards',
	usage: 'w!lbkillsadd',
	image: '',
	requirements: ['MOD'],
	description: '',
	run: async (client, message, args) => {
        //let rmod = message.guild.roles.cache.get(r => r.name.toLowerCase() == 'mod')
        let mappe = new Map
        const memberi = message.guild.members.cache.get(message.author.id)
        const rmodcheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'moderator')
        const radmincheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        const rlbcheck = memberi.roles.cache.find(r => r.name.tolowerCase() === 'leaderboard moderator')
        if (!radmincheck && !rmodcheck && !rlbcheck) return message.channel.send('You don\'t have permission for that!');
        
        //console.log(rmod)
        if (!args[2]) return message.channel.send('Something Is Missing, format is w!lbkillsadd @[Member] [Kills] [Player Username]')
        const igncheck = maca.playerStatus(args[2])

        if (igncheck == undefined) return message.channel.send('Something Is Missing, format is w!lbwinsadd @[Member] [Kills] [Player Username]')
        const { uuid } = await mcp(args[2])
        const clemplayer = clementine.player.uuid(uuid)
        const usernamed = (await clemplayer).displayname
        
        let membero = message.mentions.members.first()
        let prof = await profileModel.findOneAndUpdate({ userID: membero.id }, { kills: args[1],  ign: usernamed, uuid: uuid })
        message.channel.send('Player ' + usernamed + ' has been added to the leaderboards!')
        const objectify = client.commands.get('klbupdate')
        objectify.run(client, message, args)
        }
}