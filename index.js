// Packages
const Discord = require("discord.js")
const client = new Discord.Client({intents: new Discord.Intents(32767)})
const { Player } = require('discord-player');

// Gives Client To Functions
module.exports = client;


// Command Aliases Data
client.aliases = new Discord.Collection();

// Slash Command
client.slashCommands = new Discord.Collection();

// Functions
client.Functions = require("./Functions/index.js")

// Requiring Configs and Handlers
client.config = require("./config");
require('dotenv').config()
require("./Handlers/slash.js")(client)
require("./Handlers/events.js")(client)

// Player Data
client.player = new Player(client, client.config.Option.discordPlayer);
const player = client.player

// Error Handling
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});


player.on('trackStart', (queue, track) => {
  if (!client.config.Option.loopMessage && queue.repeatMode !== 0) return;
  queue.metadata.send({ content: `🎵 Music started playing: **${track.title}** -> Channel: **${queue.connection.channel.name}** 🎧` });
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send({ content: `**${track.title}** added to playlist. ✅` });
});

player.on('botDisconnect', (queue) => {
  queue.metadata.send({ content: 'Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌' });
});

player.on('channelEmpty', (queue) => {
  queue.metadata.send({ content: 'I left the audio channel because there is no one on my audio channel. ❌' });
});

player.on('queueEnd', (queue) => {
  queue.metadata.send({ content: 'All play queue finished, I think you can listen to some more music. ✅' });
});

// EVAL Command
client.on("messageCreate", async message => {
    const args = message.content.split(" ").slice(1);
    if (message.content.startsWith("--eval")) {
      if (message.author.id !== "653235254047408157" && message.author.id !== "359023200371212298") return message.channel.send("Sorry, you do not have permission to use this command.")
      try {
        const code = args.join(" ");
        let evaled = await eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
      }
    }
})

// SourceCode
client.on("messageCreate", async message =>{
  if (message.content.startsWith(client.config.Prefix + "sourceCode")) {
    let embe = new Discord.MessageEmbed()
    .setTitle("Source Code")
    .setDescription("[Link to the Source Code](https://github.com/Xeinostorm/Music-Discord-Bot)")
    .setColor("GREEN")
    message.channel.send({embeds: [embe]})
  }
});


// Login To BOT
client.login(process.env.TOKEN)

