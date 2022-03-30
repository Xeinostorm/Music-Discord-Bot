

module.exports = (client) =>{
    client.on("InteractionCreate",interaction =>{
        if (client.config.Option.Role.enabled == true && client.config.Option.Role.commands.includes(interaction.commandName)) {
            const roleDJ = interaction.guild.roles.cache.find(x => x.name === client.config.Option.Role.RoleID);
            if(roleDJ) return interaction.followUp({content: `${interaction.author}, Couldn't find <@!${client.config.Option.Role.RoleID}> role! This command is set only for those with the <@!${client.config.Option.Role.RoleID}> role. ❌`})
    
            if (!interaction.member.roles.cache.has(client.config.Option.Role.RoleID)) {
                return interaction.followup({ content: `${interaction.author}, This command is set only for those with the ${client.config.Option.Role.RoleID} role. ❌` });
            }
        }
    })
};