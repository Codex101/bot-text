const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
var ARRPREFIX = ["**", ";;", "!t", "!overwatch", "^^", "!", "!stc"];

//	process.env accesses the environment values, process.env.BOTS_CH acceses
// the BOTS_CH environment value
const botsChannel = process.env.BOTS_CH;

bot.on("ready", () => {
	console.log("Ready");
});

bot.on("message", (message) => {
	//	Separates message based on what's after the prefix, splits by spaces
	var argv = message.content.substr(ARRPREFIX[0].length).split(" ");
	var authorName = `${message.author.username}`;
	var messageContent = `${message.content}`;
	var oneKChars = 0;

	// Checks if message is a DM, if it is then ignore.
	if (message.channel.type == "dm")
		return;

	if ( !message.guild.channels.find("name", botsChannel) )
	{
		if ( message.author.equals(bot.user))
			return;

		message.channel.send("No bots channel detected, creating a bots channel");
		message.guild.createChannel("bots", "text");
		return;
	}

	// Loops through and checks if the message starts with the prefixes.
	for(var i = 0; i<ARRPREFIX.length; i++)
	{
		// Checks if the message starts with a prefix in array ARRPREFIX
		if ( message.content.startsWith(ARRPREFIX[i]))
		{
			// Checks if message is not posted in botsChannel channel, then resends message
			// to botsChannel channel and deletes orignal.
			if ( message.channel.id != message.guild.channels.find("name", botsChannel).id )
			{
				switch(argv[0].toLowerCase() )
				{
					case "inv":
						message.channel.send("https://discordapp.com/oauth2/authorize?client_id="+CLIENT_ID+"&scope=bot&permissions=1074265168");
						break;
					case "addprefix":
						ARRPREFIX.push(argv[1]);
						break;
					case "delprefix":
						ARRPREFIX.splice(ARRPREFIX.indexOf(argv[1]), 1);
						break;
					case "cleanprefix":
						// Creates new array that filters out values that return false
						// null/undefined values return false thus gets filtered out
						ARRPREFIX = ARRPREFIX.filter(Boolean);
						break;
					case "announcement":
						message.guild.channels.find("name", botsChannel).send("```" + messageContent + "```");
						message.delete(10000);
						break;
					case "info":
						message.channel.send("Created by 0Codex101");
						break;
					case "help":
						// Sends a message dm to the message sender.
						message.author.send("```This bot automatically moves all text from the" +
						" other channels to the  botsChannel channel\nTo add bot prefixes use \n^^addprefix PREFIX\n" +
						"To delete prefixes, use \n^^delprefixes PREFIX\n" +
						"To remove all null values, use \n^^cleanprefix\n" +
						"For a invite link, use \n^^inv\nWhere PREFIX is what you want to add```");
						break;
				}

				// Rich embeds cannot send message if more than 1024 chars,
				// Send as code block if so.
				if( messageContent.length > 1024)
				{
					message.guild.channels.find("name", botsChannel).send("Author: "+ authorName + "\n```" + messageContent + "```");
					// console.log(message.content.length);
					message.delete(10000);
					return;
				}

				// Creates an embed link, that has the author name + content
				var embed = new Discord.RichEmbed()
					.setTitle("Message author ^^")
					.addField("Message Content", messageContent)
					.setAuthor(authorName, message.author.avatarURL)
					.setTimestamp()
					.setThumbnail(message.author.avatarURL)
					.setColor(0x00FFFF)
					.setFooter("Text moved from other channels to bot channel")
				message.guild.channels.find("name", botsChannel).send({embed});
				message.delete(10000);
				return;
			}

			// This is for commands to work inside the botsChannel channel.
			switch(argv[0].toLowerCase() )
			{
					case "inv":
						message.channel.send("https://discordapp.com/oauth2/authorize?client_id=318786562164916225&scope=bot&permissions=268921936");
						break;
					case "addprefix":
						ARRPREFIX.push(argv[1]);
						break;
					case "delprefix":
						ARRPREFIX.splice(ARRPREFIX.indexOf(argv[1]), 1);
						console.log(ARRPREFIX);
						break;
					case "cleanprefix":
						// Creates new array that filters out values that return false
						// null/undefined values return false thus gets filtered out
						ARRPREFIX = ARRPREFIX.filter(Boolean);
						break;
					case "info":
						message.channel.send("Created by Codex101");
						break;
					case "help":
						// Sends a message dm to the message sender.
						message.author.send("```This bot automatically moves all text from the" +
						" other channels to the  botsChannel channel\nTo add bot prefixes use \n^^addprefix PREFIX\n" +
						"To delete prefixes, use \n^^delprefixes PREFIX\n" +
						"To remove all null values, use \n^^cleanprefix\n" +
						"For a invite link, use \n^^inv\nWhere PREFIX is what you want to add```");
						break;
				}
			return;
		}
	}

	// Not in for loop as redundant, botsChannel channel don't matter as messages not moved
	if ( message.channel.id != message.guild.channels.find("name", botsChannel).id )
	{
		// If the message is from a bot, resent to bot channel and delete it.
		// Outside for loop as botsChannel don't use prefixes to start message.
		if ( message.author.bot)
		{
			if( messageContent.length > 1024)
			{
				message.guild.channels.find("name", botsChannel).send("Author: "+ authorName + "\n```" + messageContent + "```");
				// console.log(message.content.length);
				message.delete(10000);
				return;
			}

			var embed = new Discord.RichEmbed()
				.setTitle("Message author ^^")
				.addField("Message Content", messageContent)
				.setAuthor(authorName, message.author.avatarURL)
				.setTimestamp()
				.setThumbnail(message.author.avatarURL)
				.setColor(0x660099)
				.setFooter("Text moved from other channels to bot channel")
			message.guild.channels.find("name", botsChannel).send({embed});
			message.delete(10000);
			return;
		}
		return;
	}
});

// Logs in the bot client
bot.login(TOKEN);
