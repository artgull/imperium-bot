const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const config = require("./botsettings.json")
const prefix = config.prefix;
bot.commands = new Discord.Collection();


fs.readdir('./cmds/', (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load."); return;
    }
    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Loaded!`);
        bot.commands.set(props.help.name, props);
        
    });
});

bot.on('message', message => {
    if(message.author.bot || message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).split(/ +/);
    let msg = message.content.toUpperCase();
    let user = message.author.username;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let userid = message.author.id;
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args); 


    let rul = fs.readFileSync('./lang.txt', 'utf-8')
    let tick = fs.readFileSync('./comm.txt', 'utf-8')
    let cm = fs.readFileSync('./cm.txt', 'utf-8')
    let ch = fs.readFileSync('./ch.txt', 'utf-8')
	if(message.content === prefix + "help") {
        message.delete()
        let pages = ['**CHANGE R6 LANGUAGE**', '**CUMMUNICATION WITH ADMINISTRATION**', '**COMMANDS**', '**CHANNELS**']
        let page = 1

        let textes = [rul, tick, cm, ch]
        let text = 1

        const embed = new Discord.MessageEmbed()
        .setColor("#488F36")
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(textes[text-1])
        .setTitle(pages[page-1])

        message.channel.send(embed).then(msg => {
            msg.react('⏪').then(r => {
                msg.react('⏩')

                const backwardFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id

                const backwards = msg.createReactionCollector(backwardFilter, { time: 120000 });
                const forwards = msg.createReactionCollector(forwardsFilter, { time: 120000 });

                backwards.on('collect', r => {
                    if(page === 1) return;
                    page--;
                    text--;
                    embed.setTitle(pages[page-1])
                    embed.setDescription(textes[text-1])
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })

                forwards.on('collect', r => {
                    if(page === pages.length) return;
                    page++;
                    text++;
                    embed.setTitle(pages[page-1])
                    embed.setDescription(textes[text-1])
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                    

                })
            })
        })
    }
    

});


bot.on('ready', () => {
    console.log('Bot ready');
});

bot.login(config.token);