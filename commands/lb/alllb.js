// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, MessageReaction, MessageManager } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/player')
const maca = require('mcdata')
const mch = require('minecraft_head')
const mcp = require('minecraft-player')
const apit = require('@zikeji/hypixel')
const clementine = new apit.Client("d1288f02-a6f1-4765-99ff-82b327026d2e")
// module

module.exports = {
	name: 'alllbadd',
	category: 'leaderboards',
	usage: 'w!alllbadd',
	image: '',
	requirements: ['STAFF'],
	description: '',
	run: async (client, message, args) => {
        const memberi = message.guild.members.cache.get(message.author.id)
        const rmodcheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'moderator')
        const rsmodcheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'senior moderator')
        const radmincheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        const rlbmodcheck = memberi.roles.cache.find(r => r.name.toLowerCase() === 'leaderboard moderator')
        if (!radmincheck && !rsmodcheck && !rmodcheck && !rlbmodcheck) return message.channel.send('You don\'t have permission for that!');
        const igncheck = maca.playerStatus(args[1])

        if (igncheck == undefined || typeof(args[1]) != 'string') return message.channel.send('Username Is Incorrect In Some Way!')
        if (!args[7]) return message.channel.send('Not all stats were provided, retype the command')
        try {
                const { bippity } = await mcp(args[1])
        }
        catch (err) {
                return message.channel.send('Username Incorrect')
        }
        const { uuid } = await mcp(args[1])
        const clemplayer = clementine.player.uuid(uuid)
        const usernamed = (await clemplayer).displayname
        console.log('Tf')
        let membero = message.mentions.members.first()
        if (!membero) return message.channel.send('Mention The User')
        console.log(membero.id)
        let prof = await profileModel.findOneAndUpdate({ userID: membero.id }, { wins: args[2], kills: args[3], assist: args[4], bp: args[5], bb: args[6], power: args[7],  ign: usernamed, uuid: uuid })
        let profi = await profileModel.findOne({ userID: membero.id })
        console.log(profi)
        const tfift = message.guild.roles.cache.find(r => r.id === '959453065264640010')
        const fift = message.guild.roles.cache.find(r => r.id === '953628812371963964')
        const sfift = message.guild.roles.cache.find(r => r.id === '953628914759110696')
        const onek = message.guild.roles.cache.find(r => r.id === '955833983764160522')
        const twok = message.guild.roles.cache.find(r => r.id === '956903389055287336')
        const thrk = message.guild.roles.cache.find(r => r.id === '959455143403859968')
        const fork = message.guild.roles.cache.find(r => r.id === '959457586661437521')
        const fivk = message.guild.roles.cache.find(r => r.id === '959462635861069854')
        const sixk = message.guild.roles.cache.find(r => r.id === '967879134355263598')
        const sevk = message.guild.roles.cache.find(r => r.id === '967879953574133780')
        const eigk = message.guild.roles.cache.find(r => r.id === '967879428992565298')
        const nink = message.guild.roles.cache.find(r => r.id === '967880179017990175')
        const tenk = message.guild.roles.cache.find(r => r.id === '967880389928566845')
        console.log(args[2])
        if (args[2] >9999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >8999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >7999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >6999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >5999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >4999) {
                membero.roles.add(fivk)
        }
        else if (args[2] >3999) {
                membero.roles.add(fork)
        }
        else if (args[2] >2999) {
                membero.roles.add(thrk)
        }
        else if (args[2] >1999) {
                membero.roles.add(twok)
        }
        else if (args[2] >999) {
                membero.roles.add(onek)
        }
        else if (args[2] >749) {
                membero.roles.add(sfift)
        }
        else if (args[2] >499) {
                membero.roles.add(fift)
        }
        else if (args[2] >249) {
                membero.roles.add(tfift)
        }
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
        message.channel.send('Player ' + usernamed + ' has been added to the leaderboards!')
	},
};

