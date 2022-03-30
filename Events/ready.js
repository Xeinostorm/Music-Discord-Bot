const Discord = require('discord.js');
const moment = require('moment');

module.exports = client => {
  const config = client.config
  
  console.log(`${moment().format("hh:mma DD/MM/YYYY")} | Logged in as ${client.user.tag}.`);
  console.log(`${moment().format("hh:mma DD/MM/YYYY")} | Bot is inside ${client.guilds.cache.size} servers and Serves ${client.users.cache.set.length} user/s.`);
  console.log(`${moment().format("hh:mma DD/MM/YYYY")} |`)
  setInterval(async () => {
    const statuslist = [
      `XSploit | ${config.Prefix}help`,
      `XSploit | ${config.Prefix}Support`,
      `XSploit | ${config.Prefix}SourceCode`,
      `XSploit | inside ${client.guilds.cache.size} servers`,
      `XSploit | Serves ${client.users.cache.set.length} user/s`
    ];
    const random = Math.floor(Math.random() * statuslist.length);
    try {
      client.user.setActivity(statuslist[random], {type:"PLAYING"})
    } catch (error) {
      console.error(error);
    }
  }, 15000);
}; 