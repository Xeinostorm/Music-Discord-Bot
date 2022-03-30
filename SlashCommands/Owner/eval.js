const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");
const fs = require('fs')
const moment = require("moment")

module.exports = {
    name: "eval",
    description: "owner's only",
    permission:"OWNER", // CHECK IF THE USE HAS PERMISSION
    options: [{
        name: "script",
        description: "type a code to execute",
        type: 3,
        required: true
    }],
    run: async (client, interaction, args) => {
        const nembed = new MessageEmbed()
            .setTitle("EVAL").setColor("RANDOM")
            .setDescription("❌ You dont have perms to use this command. Only Owner's can use this command")
            .setThumbnail(interaction.member.user.displayAvatarURL())
            .setFooter({text: interaction.member.user.tag})

        if (!client.config.OwnerID.includes(interaction.member.user.id)) return interaction.followUp({
            embeds: [nembed]
        });

        let ScripTtoEval = interaction.options.getString("script")
        



        try {
            const embed = new MessageEmbed()
                .setTitle("EVAL").setColor("RANDOM")
                .setDescription("❌ Error: `Cannot evaluate nothing`")
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter({text: interaction.member.user.tag})
            let evaluated = inspect(eval(ScripTtoEval, {
                depth: 0
            }))
            if (!ScripTtoEval) return interaction.followUp({
                embeds: [embed]
            });
            const embed1 = new MessageEmbed()
                .setTitle("EVAL").setColor("RANDOM")
                .setDescription("❌ Error: `Request is too long.`")
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter({text: interaction.member.user.tag})

            if (evaluated.length > 1950) return interaction.followUp({
                embeds: [embed1]
            });
            let hrDiff = process.hrtime(process.hrtime());
            const embed2 = new MessageEmbed()
                .setTitle("EVAL").setColor("RANDOM")
                .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``)
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter({text: interaction.member.user.tag});

            interaction.followUp({
                embeds: [embed2]
            }) 
            
            
            
        } catch (e) {
            interaction.followUp({
                content: `An error occurred : \`${e.message}\``
            });
        }
    }
}