import { Client, TextChannel } from "discord.js";
import { Listener } from "../abstractlistener";

module.exports = class GuildMemberRemove extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('guildMemberRemove', member => {
            let general = client.channels.cache.find(channel => (channel as TextChannel).name == "general") as TextChannel
            general.send(`**_${member.displayName} has left._**`)
        })
    }
}