const { MessageActionRow, MessageButton, Client, MessageReaction, User, Permissions, MessageEmbed, MessageAttachment, Collection, PermissionOverwrites } = require('discord.js')
const colours = require('../configs/colours.json')
const supportSch = require('../schemas/support.js')
const reportSch = require('../schemas/report.js')
const ticketSchema = require('../schemas/ticket.js')
const moment = require('moment')
let allMessages = []
const fs = require('fs')
const guildDocu = require('../schemas/guild')
let Filter = ( m ) => m.content != null;
const mongoose = require('mongoose')
let guild = ''
let authori = ''
module.exports = {
    /**
     * @param {MessageReaction} reaction 
     * @param {User} user 
     */
    close : async (interaction, user, client) => {
            const leuser = guildDocu.findOne({ ID: 1 })
            const member = client.member
            
            /*const guilds = client.guilds.cache.map(guild => guild.id)
            for (let obj of guilds) {
                console.log(obj)
                if (obj == '953439007063281694') {
                    const { guild } = 
                    console.log(guild)
                }
            }
            */
            
            const guild = await client.guilds.cache.get('953439007063281694')
            
			const { message } = interaction;
			
			const ticketDoc = await ticketSchema.findOne({ ChannelID: interaction.channelId })
	        allMessages = [];
            const intchane = await guild.channels.cache.get(`${interaction.message.channelId}`)
            
		    await fetchMore(intchane, 500).then(async messages => {
                console.log(`${messages.size} Grabbed.`);
            
        
                const putInArray = async (data) => await allMessages.push(data);
                const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
                let mas;
                mas = Array.from(messages.values());

                for (const message of mas.reverse()) await putInArray(`${handleTime(message.timestamp)} ${message.author.username} : ${message.content}`); 
            });
        if (!fs.existsSync(`./logs/${message.guild.id}`)) {
            await fs.mkdir(`./logs/${message.guild.id}`, function(err) {
                if (err) {
                  console.log(err)
                } 
                else {
                  console.log("New directory successfully created.")
                }
            })
        } 
        await fs.writeFileSync(`./logs/${message.guild.id}/Ticket-${ticketDoc.tNumber}.txt`, allMessages.join('\n'), error => {
            if(error) console.log(error);
        });
        const attachment = new MessageAttachment(`./logs/${interaction.guildId}/Ticket-${ticketDoc.tNumber}.txt`, `Ticket-${ticketDoc.tNumber}.txt`);
        const ticketCloseEmbed = new MessageEmbed()
            .setAuthor({ name: `Your Ticket has been Closed.` })
            .setColor('LUMINOUS_VIVID_PINK')
            .setThumbnail('https://therockandblues.com/wp-content/uploads/2018/07/tickets.png')
            .setDescription(`Ticket ID: ${ticketDoc.tNumber} | Closed By ${interaction.user.tag}`)
            .setTimestamp();
        const memberi = interaction.guild.members.cache.get(ticketDoc.UserID)
        console.log()
        if (memberi == undefined) {
            authori = `${interaction.channel.name}`
        }
        else {
            authori = memberi.user.tag
        }
        const ticketEmbed = new MessageEmbed()
            .setAuthor({ name: `${authori}'s Ticket Has Been Closed` })
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`Ticket ID: ${ticketDoc.tNumber} | Closed By ${interaction.user.tag}`)

            
        try {
            console.log('dafuq')
            if (memberi !== undefined) await memberi.send({ embeds: [ticketCloseEmbed], files: [ attachment ] }).catch(err => console.log(`1. Reaction Ticket Close - Error Occured: ${err}`));
            
            const canel = guild.channels.cache.get(interaction.channelId);
            await canel.delete().catch(err => console.log(`3. Reaction Ticket Close - Error Occured: ${err}`));
            let logger = guild.channels.cache.get('955255540299202641');
            await logger.send({ embeds: [ticketEmbed], files: [ attachment ]});
            await ticketDoc.deleteOne().catch(err => console.log(`4. Reaction Ticket Close - Error Occured: ${err}`));;
        }
        catch (err) {
            console.log(`Reaction Close Error Occured: ${err}`);
        }
    },
    createSupport : async (client, interaction, user) => {
        const checker = await guildDocu.findOne({ ID: 1 })
        console.log(client.guildId)
        console.log(user.guilds.cache.get(user.guildId))
        const { guild } = user.guilds.cache.get(client.guildId)
        // CIU
        // IUC
        
	    if (!checker) {
            
		    let doc = new guildDocu({
			    supportCount: 0,
                reportCount: 0,
                ID: 1,
                tCount: 0,
		    })
            
            await doc.save().catch(err => console.log(err));
	    }
        const dec = await guildDocu.findOne({ ID: 1 })
        dec.supportCount += 1
        dec.tCount += 1
        await guildDocu.findOneAndUpdate({ ID: 1 }, { supportCount: dec.supportCount, tCount: dec.tCount })
        const mod = client.guild.roles.cache.find(r => r.name.toLowerCase() == 'moderator')
        console.log(mod.id)
        const admin = client.guild.roles.cache.find(r => r.name.toLowerCase() == 'admin')
        const ticketChannel = await client.guild.channels.create(`Support-${client.user.username}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],

                },
                {
                    id: client.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                },
                {
                    id: admin.id, 
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                }, 
                {
                    id: mod.id, 
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                }
            ],
        }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`))
        
        let channel = await client.guild.channels.cache.get(ticketChannel.id);
        let cate = await client.guild.channels.cache.get('967770094056927252');
        
        if (channel && cate) await channel.setParent(cate).catch(err => console.log(`Ticket Creation - Error occured: ${err}`))
        console.log(client.user)
        await ticketChannel.permissionOverwrites.edit(client.user, { VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('CLOSE')
                .setCustomId('end')
        )
        const ticketEmbed = new MessageEmbed()
            .setAuthor({ name: `Support Ticket ${dec.supportCount}` })
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`Please do not spam ping staff to get to this ticket, abuse of this system will result in losing access to tickets`)
        
        
        const msg = await ticketChannel.send({ embeds: [ticketEmbed], components: [row] }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        ticketChannel.send('This Is A Support Ticket')
        await ticketChannel.send(`<@${client.user.id}> here is your ticket`).then(m => m.delete({ timeout: 15000 })).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        console.log(client.user.id)
        client.reply({ content: `<#${ticketChannel.id}> Is Your Ticket`, ephemeral: true})
        const tickDoc = new supportSch({
            UserID: client.user.id,
            supportNumber: dec.supportCount,
            ChannelID: ticketChannel.id,
            tNumber: dec.tCount,
        }).save()
        const tickDocu = new ticketSchema({
            UserID: client.user.id,
            ChannelID: ticketChannel.id,
            tNumber: dec.tCount,
        }).save()
    },
    createReport : async (client, interaction, user) => {
        const checker = await guildDocu.findOne({ ID: 1 })
        const { guild } = user.guilds.cache.get(client.guildId)
        
        
	    if (!checker) {
            
		    let doc = new guildDocu({
			    reportCount: 0,
                ID: 1,
                supportCount: 0,
                tCount: 0
		    })
            
            await doc.save().catch(err => console.log(err));
	    }
        const dec = await guildDocu.findOne({ ID: 1 })
        dec.reportCount += 1
        dec.tCount += 1
        await guildDocu.findOneAndUpdate({ ID: 1 }, { reportCount: dec.reportCount, tCount: dec.tCount })
        const mod = client.guild.roles.cache.find(r => r.name.toLowerCase() == 'moderator')
        const sser = client.guild.roles.cache.find(r => r.name.toLowerCase() == 'screenshare team')
        const admin = client.guild.roles.cache.find(r => r.name.toLowerCase() == 'admin')
        const ticketChannel = await client.guild.channels.create(`Report-${client.user.username}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],

                },
                {
                    id: client.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                },
                {
                    id: admin.id, 
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                }, 
                {
                    id: mod.id, 
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                },
                {
                    id: sser.id, 
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                }
            ],
        }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`))
        let channel = await client.guild.channels.cache.get(ticketChannel.id)
        let cate = await client.guild.channels.cache.get('967770094056927252');
        
        if (channel && cate) {
            await channel.setParent(cate).catch(err => console.log(`Ticket Creation - Error occured: ${err}`))
        } 
        await ticketChannel.permissionOverwrites.edit(client.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('DANGER')
                .setLabel('CLOSE')
                .setCustomId('end')
        )
        const ticketEmbed = new MessageEmbed()
            .setAuthor({ name: `Report Ticket ${dec.reportCount}` })
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`Please do not spam ping staff to get to this ticket, abuse of this system will result in losing access to tickets`)
        
        
        const msg = await ticketChannel.send({ embeds: [ticketEmbed], components: [row] }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        await ticketChannel.send(`<@${client.user.id}> here is your ticket`).then(m => m.delete({ timeout: 15000 })).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
        ticketChannel.send('This Is A Report Ticket')
        client.reply({ content: `<#${ticketChannel.id}> Is Your Ticket`, ephemeral: true})
        const tickDoc = new reportSch({
            UserID: client.user.id,
            reportNumber: dec.reportCount,
            ChannelID: ticketChannel.id,
            tNumber: dec.tCount
        }).save()
        const tickDocu = new ticketSchema({
            UserID: client.user.id,
            ChannelID: ticketChannel.id,
            tNumber: dec.tCount,
        }).save()
    }
    
}
async function fetchMore(channel, limit = 500) {
    if (!channel) {
        console.log(channel)
      throw new Error(`Expected channel, got ${typeof(channel)}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({ limit });
    }
  
    let collection = new Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;
  
    while (remaining > 0) {
      options.limit = remaining > 100 ? 100 : remaining;
      remaining = remaining > 100 ? remaining - 100 : 0;
  
      if (lastId) {
        options.before = lastId;
      }
  
      let messages = await channel.messages.fetch(options);
  
      if (!messages.last()) {
        break;
      }
  
      collection = collection.concat(messages);
      lastId = messages.last().id;
    }
  
    return collection;
  }