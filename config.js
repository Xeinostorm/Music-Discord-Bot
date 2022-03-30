module.exports = {
    Prefix: "-",
    OwnerID: ["359023200371212298","653235254047408157"],
    Option: {
        Role: {
            enabled: true,
            RoleID: '958735188140122122', 
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume']
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
    }
};