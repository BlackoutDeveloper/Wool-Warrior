const { Collection, Client, Intents, Permissions, MessageEmbed, Message, MessageAttachment } = require('discord.js');
const { Discord } = require('discord.js')
const { connection } = require('./handlers/database')
const { createSupport, createReport, close } = require('./handlers/ticket')
// Intents
const myIntents = new Intents();
const profileModel = require('./schemas/player')
// Guild Intents
myIntents.add('GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');
// Direct Intents
myIntents.add('DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS');
const fs = require('fs')
const prefix = 'w!'
// Client Creation
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: true
    },
    intents: myIntents
});
const config = require('./configs/config.json')
let mappe = []
let individualMessage = ''
let funcData = []
let table = ''
let embero = ''
let chid = ''
let chan = ''
const cooldown = new Set()
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
console.log('123')
client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log(`Ready! Signed in as ${client.user.username}`);
	client.user.setStatus('online')
	client.user.setActivity('WoolWars', { type: 'PLAYING' });
	connection(client)

});
client.on('messageCreate', async (message) => {
	if(!message.guild || message.author.bot) return;
	const arges = message.content.split(' ');
	
	
	
    if(!message.content.startsWith(prefix)) return;

	try {
		if(!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		
		let command = client.commands.get(cmd);
		if(!command) command = client.commands.get(client.aliases.get(cmd));
		if(!command) return;
		if (message.content.startsWith('w!lfp')) {
			if (cooldown.has(message.guild.id)) return message.channel.send('That command is on cooldown!')
			else command.run(client, message, args)
			if (message.channel.id !== '953439186617241611') return;
			else {
				cooldown.add(message.guild.id)
				setTimeout(() => {
					cooldown.delete(message.guild.id)
				}, 120000)
			}
		}
		else {
			command.run(client, message, args);
		}
	}
	catch (err) {
		message.channel.send(`\`${err}\``);
		return;
	}
	
});
client.on('interactionCreate', async (interaction, user) => {
	if (interaction.user.bot) return
	switch (interaction.customId) {
		case 'verifierbutton':
			let veriche = await profileModel.findOne({ userID: interaction.user.id, verified: true })
			let exiche = await profileModel.findOne({ userID: interaction.user.id })
			if (veriche) {
				let membero = interaction.guild.members.cache.get(interaction.user.id)
				let verole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'member')
				let merole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'unverified')
				membero.roles.add(verole)
				membero.roles.remove(merole)
				return interaction.reply({ content: 'You are already verified!', ephemeral: true})
			}
			let verole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'member')
			let merole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'unverified')
			if (exiche) {
				let newProfi = profileModel.findOneAndUpdate({ userID: interaction.user.id }, { verified: true })
			}
			else {
				let newProfi = new profileModel({
					userID: interaction.user.id,
					verified: true
				}).save()
			}
			let membero = interaction.guild.members.cache.get(interaction.user.id)
			membero.roles.add(verole)
			membero.roles.remove(merole)
			interaction.reply({ content: 'You are now verified!', ephemeral: true })
			break;
		case 'mobilebroken': 
		
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.bb>0
    	    })

    	    mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.bb - b.bb
        	})

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].bb})

	        };

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

        	embero = new MessageEmbed()
            	.setTitle('Leaderboard - Blocks Broken')
	            .setDescription(table)
    	        .setColor('LUMINOUS_VIVID_PINK')

        	
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'mobileplaced':
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.bp>0
    	    })

	        mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.bp - b.bp
    	    })

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].bp})

            
        	};

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

	        embero = new MessageEmbed()
    	        .setTitle('Leaderboard - Blocks Placed')
        	    .setDescription(table)
            	.setColor('LUMINOUS_VIVID_PINK')

	        
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'mobilepower':
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.power>0
    	    })

	        mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.power - b.power
    	    })

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].power})

            
			};

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

        	embero = new MessageEmbed()
            	.setTitle('Leaderboard - Powerups Collected')
 	           .setDescription(table)
    	        .setColor('LUMINOUS_VIVID_PINK')
        
        	
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'mobilewins':
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.wins>0
    	    })
	        mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.wins - b.wins
    	    })

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].wins})

            
    	    };

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

        	embero = new MessageEmbed()
            	.setTitle('Leaderboard - Wins')
	            .setDescription(table)
    	        .setColor('LUMINOUS_VIVID_PINK')

        	
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'mobilekills':
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.kills>0
    	    })
	        mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.kills - b.kills
    	    })

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].kills})

            
    	    };

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

        	embero = new MessageEmbed()
            	.setTitle('Leaderboard - Kills')
	            .setDescription(table)
    	        .setColor('LUMINOUS_VIVID_PINK')

        	
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'mobileassist':
			mappe = await profileModel.find()  // Get data from mongodb}
			mappe = mappe.filter(function(value) {
                return value.assist>0
    	    })
	        mappe = mappe.sort(function (b, a) {					//Sort Data into correct order
                return a.assist - b.assist
    	    })

	        
        	individualMessage = false
			funcData = []

			for (let pos = 0; pos < 50 && pos < mappe.length; pos++) {	//For each player in grabbed data

				funcData.push({"uName" : mappe[pos].ign, "uWins" : mappe[pos].assist})

            
    	    };

        

			table = format(1,funcData,0)
			if (typeof(table) == Array) {message.channel.send({content: table})}

        	embero = new MessageEmbed()
            	.setTitle('Leaderboard - Assists')
	            .setDescription(table)
    	        .setColor('LUMINOUS_VIVID_PINK')

        	
        	interaction.reply({ embeds: [embero], ephemeral: true })
			break;
		case 'end':
			close(interaction, interaction.user, client)
			break;
		case 'support': 
			createSupport(interaction, interaction.user, client)
			break;
		case 'report':
			createReport(interaction, interaction.user, client)
			break;
    }
})
client.login(config.token)
//use own token

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