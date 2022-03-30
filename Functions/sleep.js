// Packages
const Discord = require("discord.js")
const client = new Discord.Client({intents: new Discord.Intents(32767)})
const { Player } = require("discord-player");

// Timeout
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {sleep};