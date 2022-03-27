// Packages
const Discord = require("discord.js")
const client = new Discord.Client({intents: new Discord.Intents(32767)})

// Configs
require('dotenv').config()

// Login To BOT
client.login(process.env.TOKEN)