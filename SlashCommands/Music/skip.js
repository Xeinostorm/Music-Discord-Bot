const { QueryType } = require("discord-player");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "skip",
    description: "Skip the song for you!",
    permissions: "NONE",
    onlyguild: true,
    run: async(client, interaction, args) =>{
        const queue = client.player.getQueue(interaction.guild.id);
 
        if (!queue || !queue.playing) return interaction.followUp({ content: `${message.author}, There is no music currently playing!. ❌` });

        const success = queue.skip();

        return interaction.followUp({ content: success ? `**${queue.current.title}**, Skipped song ✅` : `${message.author}, Something went wrong ❌` });
    }
} 