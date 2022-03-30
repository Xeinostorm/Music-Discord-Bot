
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
  
  