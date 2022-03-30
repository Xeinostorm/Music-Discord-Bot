const { glob } = require("glob");
const path = require("path");
const { promisify } = require("util");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const moment = require("moment");

const globPromise = promisify(glob);

module.exports = async(client) =>{

  const commandFiles = glob.sync("./SlashCommands/**/*.js").filter(file => file.endsWith('.js'));

  
  
  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/**/*.js`);

  const arrayOfSlashCommands = [];
  client.arrayOfSlashCommands = arrayOfSlashCommands;
  try{
    console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} | Loading ${commandFiles.length} Slash Commands...\x1b[0m`)
    console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)
  }catch(err){
      console.log(err)
  }
  slashCommands.map((value) => {
    
    const file = require(value);
    let rt = `${path.resolve(value)}`
    const FileName = path.basename(rt);
    if (!file?.name) {
      console.log(`\x1b[31m${moment().format("hh:mma DD/MM/YYYY")} |  - Couldn't load ${FileName}!\x1b[0m`)
      console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)
      return;
    } 
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  arrayOfSlashCommands.forEach(element => {
    try{
      console.log(`\x1b[32m${moment().format("hh:mma DD/MM/YYYY")} |  + ${element.name.toUpperCase()} command loaded!\x1b[0m`)
      console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)
    }catch(err){
        console.log(err)
    }
  });
  client.on("ready", async () => {
    // Register for all the guilds the bot is in
    await client.application.commands.set(arrayOfSlashCommands);
  });

}
 