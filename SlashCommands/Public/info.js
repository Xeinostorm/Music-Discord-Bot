

module.exports = {
    name: "info",
    description: "Shows the ping of the bot.",
    permissions: "NONE",
    onlyguild: false,
    run: async(client, interaction, args) =>{
        interaction.send(`${client.ws.ping} ws ping`);
    }
}