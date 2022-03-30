module.exports = {
    Prefix: "-",
    OwnerID: ["359023200371212298","653235254047408157"],
    Option: {
        Role: {
            enabled: true,
            RoleName: "Music",
            RoleID: '958735188140122122', 
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume','play']
        },
        selfDeaf: false, 
        maxVol: 100,
        loopMessage: false, 
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    },
    Permissions: [
        "ADMINISTRATOR","MODERATE_MEMBERS","KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","MANAGE_GUILD","MANAGE_MESSAGES","MANAGE_ROLES"
    ]
};