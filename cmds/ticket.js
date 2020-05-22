const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
    if(args[1] === undefined) return message.reply("Wrong input. Correct: ```-ticket open <reason>``` or ```-ticket close <reason>```")
    if(args[2] === undefined) return message.reply("Wrong input. There is no reason in your message")
    if(args[1] === "open") {

        var aid = message.author.id;
        var name = message.author.username;
        let cpl = args.slice(2).join(" ")
        //let impcat = '702967866881867996'
        let cat = '648819252505346049'

        message.delete()

      await  message.guild.channels.create(`Ticket-${cpl}`, 'text').then(ma => {
            ma.setParent(cat);
            ma.lockPermissions();
        }).catch(err => console.log(err))
        let nChannel = bot.channels.cache.find(channel => channel.name.toLowerCase() === cpl)
        console.log(nChannel)
        let embed = new Discord.MessageEmbed()
        .setTitle("New Ticket")
        .setDescription(`${message.guild.members.get(aid).nickname}`)
        nChannel.send(embed)




        /*
        channel.overwritePermissions([
   {
      id: message.author.id,
      deny: ['VIEW_CHANNEL'],
   },
 ])
*/
    }


}
module.exports.help = {
    name: "ticket"
}