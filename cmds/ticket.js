const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = (bot, message, args) => {
    const aid = message.guild.members.cache.get(message.author.id).displayName;
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[2])
    let tickcount = 0
    if(args[1] === undefined) return message.reply("Wrong input. Correct: ```!ticket open <reason>``` or ```!ticket close <reason>```")
    if(args[2] === undefined) return message.reply("Wrong input. There is no reason in your message")
    if(args[1] === "open") {
    message.delete()
        
        let cpl = args.slice(2).join(" ")
        //let impcat = '702967866881867996'
        //let imptickch = '706551498049454150'
        let cat = '702967866881867996'

       

        message.guild.channels.create(cpl, 'text').then(async (newChannel) => {
            await newChannel.setParent(cat);
             //newChannel.lockPermissions();
            await newChannel.overwritePermissions([
                {
                    id: message.guild.id,
			        deny: ['VIEW_CHANNEL'],
                },

                {

                   id: message.author.id,
                   allow: ['VIEW_CHANNEL'],
                },
              ])
              let crch = newChannel.id
             
              global.chch = crch
            let embed = new Discord.MessageEmbed()
        .setTitle("New Ticket")
        .setDescription(`
              Welcome, ${bot.users.cache.get(message.author.id).toString()}

              Please describe your problem completely.

              To close your ticket use:
              !ticket close <reason to close>

              If you need to add users to ticket use:
              !ticket adduser <@user>
              
        `) 
        .setColor('YELLOW')
        newChannel.send(embed)
        }).catch(err => console.log(err))
    }
    
    //let rlh =  bot.users.cache.roles.has('role-id-here');
    if(args[1] === 'close' && args[2] === undefined) return message.reply("Wrong input. There is no reason in your message")
    if(global.chch === undefined) tickcount++;
    if(args[1] === 'close' && tickcount === 1 && args[2] !== undefined) return message.reply("Error: You should send that in your ticket channel if it exist")
    if(args[1] === 'close' && args[2] !== undefined) {
        message.delete()
        tickcount = 0
        let cpl = args.slice(2).join(" ")
        let ch = bot.channels.cache.get(global.chch.toString())
        //console.log(ch.id)
        message.channel.delete().then(async (tickch) => {
            let admch = bot.channels.cache.get('706551498049454150')
           await admch.send(`Тикет ${tickch.name} удален юзером ${aid}. Причина: ${cpl}`)
        }).catch(err => console.log(err))
        
    }
    
    if(args[1] === 'adduser' && args[2] === undefined) return message.reply("Wrong input. There is no user mention in your message")
    if(global.chch === undefined) tickcount++;
    if(args[1] === 'adduser' && (tickcount === 1 || tickcount === 2) && args[2] !== undefined) return message.reply("Error: You should send that in your ticket channel if it exist")
    if(args[1] === 'adduser' && args[2] !== undefined) {
        message.delete()
        tickcount = 0
        
        bot.channels.cache.get(global.chch.toString()).overwritePermissions([
            {
               id: pUser.id,
               allow: ['VIEW_CHANNEL','SEND_MESSAGES'], 
            },
          ], message.channel.send("The user was successfully added to the channel!"))
    }
    

}
module.exports.help = {
    name: "ticket"
}