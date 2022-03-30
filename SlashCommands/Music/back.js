const { QueryType } = require("discord-player");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "back",
    description: "back to previus song in queue!",
    permissions: "NONE",
    onlyguild: true,
    run: async(client, interaction, args) =>{
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.followUp({ content: `${interaction.author}, No music currently playing! ❌` });

        if (!queue.previousTracks[1]) return interaction.followUp({ content: `${interaction.author}, There was no music playing before ❌` });

        await queue.back();

        interaction.followUp({ content: `Previous music started playing... ✅` });
    }
} 