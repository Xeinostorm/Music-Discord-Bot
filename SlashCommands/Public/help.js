const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Shows bot commands.",
    permissions: "NONE",
    onlyguild: true,
    options: [{
        name: "command",
        description: "Shows help menu for specific command",
        type: 3,
        required: false,
    }],
    run: async(client, interaction, args) =>{
        const data = [];
		const commands = interaction.client.slashCommands;

		if (!args.length) {
            data.push('Here\'s a list of all my commands: ');
            data.push(commands.map(command => command.name).join(', '));
            const user = client.users.cache.get(interaction.member.user.id);

            return user.send(`${data}`, { split: true })
                .then(() => {
                    if (interaction.channel.type === 'dm') return;
                    interaction.followUp('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${interaction.member.user.tag}.\n`, error);
                    interaction.followUp('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }else{
            const name = interaction.options.getString("command")
            const command = commands.get(name);

            if (!command) {
                return interaction.followUp('that\'s not a valid command!');
            }

            data.push(`**Name:** ${command.name}`);

            if (command.description) data.push(`**Description:** ${command.description}`);

            interaction.followUp(`${data}`, { split: true });
        }

    }
}