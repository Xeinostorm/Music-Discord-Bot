
module.exports = async (client, interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});
  
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd)
          return interaction.followUp({ content: "An error has occured! Please contact the support server." });
  
      const args = [];
  
      for (let option of interaction.options.data) {
          if (option.type === "SUB_COMMAND") {
              if (option.name) args.push(option.name);
              option.options?.forEach((x) => {
                  if (x.value) args.push(x.value);
              });
          } else if (option.value) args.push(option.value);
      }
      try{
        if(cmd.onlyguild == true){
          if(!interaction.guild) return interaction.followUp({content: "You can't use this command here!"});
        }
        if (client.config.Option.Role.enabled == true && client.config.Option.Role.commands.includes(interaction.commandName)) {
          const roleDJ = interaction.guild.roles.cache.find(x => x.name === client.config.Option.Role.RoleID);
          if(roleDJ) return interaction.followUp({content: `Couldn't find ${client.config.Option.Role.RoleName} role! This command is set only for those with the ${client.config.Option.Role.RoleName} role. ❌`})
  
          if (!interaction.member.roles.cache.has(client.config.Option.Role.RoleID)) {
            return interaction.followUp({ content: `This command is set only for those with the ${client.config.Option.Role.RoleName} role. ❌` });
          }
        }
        if(cmd.permissions !== "" && cmd.permissions !== null && cmd.permissions !== "NONE"){
          if(cmd.permissions == "OWNER"){
            if(client.config.OwonerID.includes(interaction.user.id)){
              interaction.followUp({content:"You can't use this command! Only bot's owner can use this command!"})
              return;
            }
          }else if(cmd.permissions == "SERVER_OWNER"){
            let owner = await interaction.guild.fetchOwner()
            if(owner.id == interaction.user.id){
              interaction.followUp({content:"You can't use this command! Only server's owner can use this command!"})
              return;
            }
          }else if(cmd.permissions.includes(client.config.Permissions)){

          }else{
            interaction.followUp({content: "Couldn't find that permission"})
            return;
          }
          
        }
      }catch(err){
        console.log(err)
        return;
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);

      
      try{
        cmd.run(client, interaction, args);    
      }
      catch(err){
        console.log(err.stack)
        return;
      }
      
  }
  
  // Context Menu Handling
  if (interaction.isContextMenu()) {
      await interaction.deferReply({ ephemeral: true });
      const command = client.slashCommands.get(interaction.commandName);

      try{
        if (command) command.run(client, interaction);
      }
      catch(err){
        console.log(err.stack)
        return;
      }
  }
  };
  
  