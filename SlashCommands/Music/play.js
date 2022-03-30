const { QueryType } = require("discord-player");
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "play",
    description: "play a song for you!",
    permissions: "NONE",
    onlyguild: true,
    options:[{
        name: "title",
        description: "title of the song",
        type: 3,
        required: false,
    },{
        name: "url",
        description: "URL for the song",
        type: 3,
        required: false,
    }],
    run: async(client, interaction, args) =>{
        client.tst

        // IMPORTANT
        let ERROR_IMPUT;
        const Search = [];
        const Title = interaction.options.getString("title");
        const URL = interaction.options.getString("url");



        const ERROR = new MessageEmbed()
        .setTitle("Play")
        .setDescription(`Error: ${ERROR_IMPUT}`)
        .setColor("RANDOM")

        if(Title == null || Title == ""){
            if(URL !== null || URL !== ""){
                Search.push(URL)
            }else if (URL == null || URL == ""){
                ERROR_IMPUT = `${interaction.author}, Write the name of the music you want to search. ❌`
                client.Functions.sleep(100)
                interaction.followUp({embeds: [ERROR]})
            }
        }else if(Title !== null || Title !== ""){
            Search.push(Title)
        }

        if (!interaction.member.voice.channel){
            ERROR_IMPUT = "Please join a voice channel first!"
            client.Functions.sleep(100)
            interaction.followUp({embeds: [ERROR]})
            return;
        }

        const res = await client.player.search(args.join(' '), {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            ERROR_IMPUT = `${interaction.author}, No results found! ❌`
            client.Functions.sleep(100)
            interaction.followUp({embeds: [ERROR]})
            return;
        }

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            ERROR_IMPUT = `${interaction.author}, I can't join audio channel. ❌`
            client.Functions.sleep(100)
            interaction.followUp({embeds: [ERROR]})
            return;
        }

        await interaction.followUp({ content: `Your ${res.playlist ? 'Playlist' : 'Track'} Loading... 🎧` });

        if(client.config.Option.selfDeaf === false) {
            let channel = interaction.member.voice.channel;
            const { joinVoiceChannel } = require('@discordjs/voice');
            const connection = joinVoiceChannel({
               channelId: channel.id,
               guildId: channel.guild.id,
               adapterCreator: channel.guild.voiceAdapterCreator,
               selfDeaf: false
            });
        }
            
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();


    }
} 