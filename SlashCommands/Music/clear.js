const { QueryType } = require("discord-player");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "clear",
    description: "clear song's queue!",
    permissions: "NONE",
    onlyguild: true,
    run: async(client, interaction, args) =>{
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.followUp({ content: `${interaction.author}, No music currently playing. ❌` });

        if (!queue.tracks[0]) return interaction.followUp({ content: `${interaction.author}, There is already no music in queue after the current one ❌` });

        await queue.clear();

        interaction.followUp({ content: `The queue has just been cleared. 🗑️` });
    }
} 