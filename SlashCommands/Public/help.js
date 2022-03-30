const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Shows bot commands.",
    permissions: "NONE",
    onlyguild: false,
    run: async(client, interaction, args) =>{
        let ContentNmae;
        let Content;


        const commands = client.slashCommands()
        
        const Reply = new MessageEmbed()
        .setTitle("Name")
        .setDescription(`${ContentNmae} ${Content}`)

        try{
            ContentNmae = "Error: ";
            Content = "This command isn't done";
        }catch(err){
            ContentNmae = "Error: ";
            Content = err;
        }

        interaction.followup({embeds: [Reply]})

    }
}