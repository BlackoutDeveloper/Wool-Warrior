// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/player')
const maca = require('mcdata')
const mch = require('minecraft_head')
const mcp = require('minecraft-player')
const apit = require('@zikeji/hypixel')
const clementine = new apit.Client("d1288f02-a6f1-4765-99ff-82b327026d2e")
let igncheck = ''
// module

module.exports = {
	name: 'setign',
	category: 'account',
	usage: 'w!setign [IGN]',
	image: '',
	requirements: ['NONE'],
	description: 'Set your IGN',
	run: async (client, message, args) => {
        //let rmod = message.guild.roles.cache.get(r => r.name.toLowerCase() == 'mod')
        
        const memberi = message.guild.members.cache.get(message.author.id)
        
        
        
        //console.log(rmod)
        if (!args[0]) return message.channel.send('Provide your username')
        try {
            igncheck = maca.playerStatus(args[0])
        }
        catch {
            return message.channel.send('IGN Incorrect')
        }

        if (igncheck == undefined) return message.channel.send('IGN Incorrect')
        
        const { uuid } = await mcp(args[0])
        
        
        if (!uuid) return message.channel.send('IGN Incorrect')
        
        const clemplayer = clementine.player.uuid(uuid)
        const usernamed = (await clemplayer).displayname
        
        
        let prof = await profileModel.findOneAndUpdate({ userID: message.author.id }, { ign: usernamed, uuid: uuid })
        return message.channel.send('IGN Set To ' + usernamed)
        
    }
}