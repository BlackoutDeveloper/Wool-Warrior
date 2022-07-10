const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/player')
const maca = require('mcdata')
const mch = require('minecraft_head')
const mcp = require('minecraft-player')
const apit = require('@zikeji/hypixel')
const clementine = new apit.Client("d1288f02-a6f1-4765-99ff-82b327026d2e")
// module

module.exports = {
    name: 'oblbbb',
    category: 'dev',
    usage: '',
    image: '',
    requirements: ['NONE'],
    description: '',
    run: async (client, message, args) => {


        let mappe = await profileModel.find()  // Get data from mongodb}
        let sake = mappe.filter(function(value) {
                return value.bb>0
        })
        let caro = await sake.sort(function (b, a) {					//Sort Data into correct order
                return a.bb - b.bb
        })
        
        
        let individualMessage = false
		let funcData = []

		for (let pos = 0; pos < 50 && pos<sake.length; pos++) {	//For each player in grabbed data

			funcData.push({"uName" : caro[pos].ign, "uWins" : caro[pos].bb})

        };

        

		let table = format(2,funcData,4)
		if (typeof(table) == Array) {message.channel.send({content: table})}

        let embero = new MessageEmbed()
            .setTitle('Leaderboard - Blocks Broken')
            .setDescription('These leaderboards are very bugged due to past issues, they are not realistic\n\n'+table)
            .setColor('LUMINOUS_VIVID_PINK')

        const chid = '953442903630430228'
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('I Am On Mobile!')
                .setCustomId('mobilebroken')
        )
        const chan = message.guild.channels.cache.get(chid)
        chan.send({ embeds: [embero], components: [row] })
    },
};

function format(columns,data,coulumnSpacing) { //columns == an int, data == [{},{},{},...]
	let output = ""
    let arrOfColumns = []
	let arrOfStrings = []
    let spacing = ""
    let maxLength = 0
    for (let i = 0; i < coulumnSpacing; i++) { spacing += " "}
	let splitPoint = Math.floor(data.length/columns)
	for (let i = 0; i < data.length; i++) {
        var content = `#${i+1}: ${data[i].uName} - ${data[i].uWins}`
        if (content.length > maxLength) { maxLength = content.length}
		arrOfStrings.push(content)
	}
    for (let i = 0; i < arrOfStrings.length; i++) {
        var currentLength = arrOfStrings[i].length
        var lengthChange = maxLength - currentLength
        
        if (lengthChange < 0) {return ["Error: Could Not Calculate Padding Length - Length is negative"]}
        var charactersChange = ""
        for (let j = 0; j <= lengthChange; j++) {
            charactersChange += " "
        }
        
        arrOfStrings[i]+=charactersChange
    }
	for (let i = 0; i <columns; i++ ) {
		arrOfColumns.push(arrOfStrings.slice(splitPoint*i,splitPoint*(i+1)))
	}
    
    for (let i = 0; i < splitPoint; i++) {
        for (let j = 0; j < columns; j++) {
            output += `\`${arrOfColumns[j][i]}\``
            output += spacing
        }
        output += "\n"
    }
    return output
}