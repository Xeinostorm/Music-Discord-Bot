module.exports = {
    Prefix: "-",
    Option: {
        Role: {
            enabled: false,
            roleName: 'Music', 
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