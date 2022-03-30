const Discord = require("discord.js");
const client = new Discord.Client({intents: new Discord.Intents(32767)})
const moment = require("moment")
const fs = require("fs")


module.exports = async (client)=>{
    await client.Functions.sleep(100);
    await fs.readdir('./Events/', (err, files) => {
        if (err) console.error(err);
        console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)
        console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} | Loading ${files.length} Events...\x1b[0m`);
        console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)
        files.forEach(f => {
            const eventName = f.split(".")[0];
            const event = require(`../Events/${f}`);
            client.on(eventName, event.bind(null, client));
            console.log(`\x1b[32m${moment().format("hh:mma DD/MM/YYYY")} |  + ${eventName.toUpperCase()} Event Loaded!\x1b[0m`);
            console.log(`\x1b[0m${moment().format("hh:mma DD/MM/YYYY")} |`)

        });
    });
}