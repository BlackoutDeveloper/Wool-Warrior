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
let uid = ''
let uuid = ''
let ign = ''
let wins = ''
let bp = ''
let bb = ''
let kills = ''
let assist = ''
let power = ''
module.exports = {
	name: 'profile',
	category: 'profile',
	usage: 'w!profile',
	image: '',
	requirements: ['NONE'],
	description: 'Shows you or a users profile',
	run: async (client, message, args) => {
        if (args[0]) {
            if (message.mentions.members.size>0) {
                const membero = message.mentions.members.first()
                console.log(membero.id)
                const data = await profileModel.findOne({ userID: `${membero.id}` })
                if (!data) {
                    let newdata = new profileModel({
                        userID: membero.id
                    }).save()
                    return message.channel.send('No data found')
                }
                console.log(data.ign)
                if (data.userID) {
                    uid = data.userID
                }
                if (data.ign) {
                    ign = data.ign
                }
                else {
                    ign = '`N/A`'
                }
                if (data.wins) {
                    wins = data.wins
                }
                else {
                    wins = '`N/A`'
                }
                if (data.bb) {
                    bb = data.bb
                }
                else {
                    bb = '`N/A`'
                }
                if (data.bp) {
                    bp = data.bp
                }
                else {
                    bp = '`N/A`'
                }
                if (data.power) {
                    power = data.power
                }
                else {
                    power = '`N/A`'
                }
                if (data.kills) {
                    kills = data.kills
                }
                else {
                    kills = '`N/A`'
                }
                if (data.assist) {
                    assist = data.assist
                }
                else {
                    assist = '`N/A`'
                }
                const embedra = new MessageEmbed()
                    .setAuthor({ name: `WoolWars Stats` })
                    .setTitle(`Stats Of ${ign}`)
                    .setDescription(`Discord: <@${uid}>`)
                    .addFields(
                        { name: 'Wins', value: `${wins}`, inline: true },
                        
                    )
                    .addFields(
                        { name: 'Kills', value: `${kills}`, inline: true },
                        { name: 'Assists', value: `${assist}`, inline: true },
                    )
                    .addFields(
                        { name: 'Blocks Broken', value: `${bb}`, inline: true },
                        { name: 'Blocks Placed', value: `${bp}`, inline: true },
                        { name: 'Powerups Collected', value: `${power}`, inline: true},
                    )
                message.channel.send({ embeds: [embedra] })
            }
            else {
                
                try {
                    const { bippity } = await mcp(args[0])
                }
                catch (err) {
                    return message.channel.send('Username Incorrect')
                }
                const { uuid } = await mcp(args[0])
                const clemplayer = clementine.player.uuid(uuid)
                const usernamed = (await clemplayer).displayname
                const data = await profileModel.findOne({ ign: usernamed })
                if (!data) { 
                    return message.channel.send('No data found')
                }
                if (data.userID) {
                    uid = data.userID
                }
                if (data.ign) {
                    ign = data.ign
                }
                else {
                    ign = '`N/A`'
                }
                if (data.wins) {
                    wins = data.wins
                }
                else {
                    wins = '`N/A`'
                }
                if (data.bb) {
                    bb = data.bb
                }
                else {
                    bb = '`N/A`'
                }
                if (data.bp) {
                    bp = data.bp
                }
                else {
                    bp = '`N/A`'
                }
                if (data.power) {
                    power = data.power
                }
                else {
                    power = '`N/A`'
                }
                if (data.kills) {
                    kills = data.kills
                }
                else {
                    kills = '`N/A`'
                }
                if (data.assist) {
                    assist = data.assist
                }
                else {
                    assist = '`N/A`'
                }
                const embedra = new MessageEmbed()
                    .setAuthor({ name: `WoolWars Stats`})
                    .setTitle(`Stats Of ${ign}`)
                    .setDescription(`Discord: <@${uid}>`)
                    .addFields(
                        { name: 'Wins', value: `${wins}`, inline: true },
                        
                    )
                    .addFields(
                        { name: 'Kills', value: `${kills}`, inline: true },
                        { name: 'Assists', value: `${assist}`, inline: true },
                    )
                    .addFields(
                        { name: 'Blocks Broken', value: `${bb}`, inline: true },
                        { name: 'Blocks Placed', value: `${bp}`, inline: true },
                        { name: 'Powerups Collected', value: `${power}`, inline: true},
                    )
                message.channel.send({ embeds: [embedra] })
            }
        }
        else {
            const data = await profileModel.findOne({ userID: message.author.id })
            if (!data) {
                let newdata = new profileModel({
                    userID: message.author.id
                }).save()
                return message.channel.send('No data found')
            }
            if (data.userID) {
                uid = data.userID
            }
            if (data.ign) {
                ign = data.ign
            }
            else {
                ign = '`N/A`'
            }
            if (data.wins) {
                wins = data.wins
            }
            else {
                wins = '`N/A`'
            }
            if (data.bb) {
                bb = data.bb
            }
            else {
                bb = '`N/A`'
            }
            if (data.bp) {
                bp = data.bp
            }
            else {
                bp = '`N/A`'
            }
            if (data.power) {
                power = data.power
            }
            else {
                power = '`N/A`'
            }
            if (data.kills) {
                kills = data.kills
            }
            else {
                kills = '`N/A`'
            }
            if (data.assist) {
                assist = data.assist
            }
            else {
                assist = '`N/A`'
            }
            const embedra = new MessageEmbed()
                .setAuthor({ name: `WoolWars Stats` })
                .setTitle(`Stats Of ${ign}`)
                .setDescription(`Discord: <@${uid}>`)
                .addFields(
                    { name: 'Wins', value: `${wins}`, inline: true },
                    
                )
                .addFields(
                    { name: 'Kills', value: `${kills}`, inline: true },
                    { name: 'Assists', value: `${assist}`, inline: true },
                )
                .addFields(
                    { name: 'Blocks Broken', value: `${bb}`, inline: true },
                    { name: 'Blocks Placed', value: `${bp}`, inline: true },
                    { name: 'Powerups Collected', value: `${power}`, inline: true},
                )
            message.channel.send({ embeds: [embedra] })
        }
	},
};

