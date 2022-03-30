const { QueryType } = require("discord-player");
const {MessageEmbed} = require("discord.js")

const { Player } = require("discord-player");




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

        const player = new Player(client);

        // IMPORTANT
        let ERROR_IMPUT;
        const Search = [];
        const Title = interaction.options.getString("title");
        const URL = interaction.options.getString("url");



        const ERROR = new MessageEmbed()
        .setTitle("Play")
        .setDescription("Error: "+ERROR_IMPUT)
        .setColor("RANDOM")

        

        if(Title == null || Title == ""){
            if(URL !== null || URL !== ""){
                Search.push(URL)
            }else if (URL == null || URL == ""){
                ERROR_IMPUT = "You can't search for nothing!"
                interaction.followUp({embeds: [ERROR]})
            }
        }else if(Title !== null || Title !== ""){
            Search.push(Title)
        }

        if (!interaction.member.voice.channel){
            ERROR_IMPUT = "Please join a voice channel first!";
            interaction.followUp({embeds: [ERROR]})
            return
        }

        const searchResult = await player.search(Search, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if(!searchResult){
            ERROR_IMPUT.push("Couldn't find that song!")
            interaction.followUp({embeds: [ERROR]})
            return
        }

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        interaction.followUp({ content: `Playing ${searchResult}` });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    }
} 