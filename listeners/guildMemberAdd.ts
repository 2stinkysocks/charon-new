import { Client, TextChannel } from "discord.js";
import { config } from "..";
import { Listener } from "../abstractlistener";

module.exports = class GuildMemberAdd extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('guildMemberAdd', member => {
            if(member.user.bot) return
            let general = client.channels.cache.find(channel => (channel as TextChannel).name == "general") as TextChannel // i love bad practice
            let actualMessage = config[member.guild.id].welcomemsg.replace('{user}', member.toString())
            general.send(actualMessage)
        })
    }
}