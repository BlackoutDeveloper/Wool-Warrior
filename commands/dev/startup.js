const profileModel = require('../../schemas/player')
// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json')
// module

module.exports = {
	name: 'catchup',
	category: 'dev',
	usage: 'w!catchup',
	image: '',
	requirements: ['DEV'],
	description: 'Catches up with members in the discord',
	run: async (client, message, args) => {
        if (message.author.id !== config.owner) return;
        message.guild.members.fetch().then((members) => {
            
            members.filter(m => !m.user.bot).forEach(async (m) => {
                let prof = await profileModel.findOne({ userID: m.id })
                console.log(prof)
                console.log('Checked')
                if (!prof) {
                    let newProf = new profileModel({
                        userID: m.id
                    }).save()
                }
                let profi = await profileModel.findOne({ userID: m.id })
                const vercheck = m.roles.cache.find(r => r.name.toLowerCase() === 'member')
                if (vercheck) {
                    let newProfi = profileModel.findOneAndUpdate({ userID: m.id }, {verified: true})
                }
                
               
            })
        })
        console.log(message.guild.members.cache.size)
	},
};

