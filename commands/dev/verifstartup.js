const profileModel = require('../../schemas/player')
// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json')
// module

module.exports = {
	name: 'verifcatchup',
	category: 'dev',
	usage: 'w!verifcatchup',
	image: '',
	requirements: ['DEV'],
	description: 'Catches up with members in the discord',
	run: async (client, message, args) => {
        if (message.author.id !== config.owner) return;
        message.guild.members.fetch().then((members) => {
            
            members.filter(m => !m.user.bot).forEach(async (m) => {
                let prof = await profileModel.findOne({ userID: m.id })
                let verole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'member')
			    let merole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'unverified')
                console.log('?')
                if (m.roles.cache.has(verole.id)) {
                    m.roles.remove(merole)
                    console.log('heh')
                }
                
               
            })
        })
        
	},
};

