// very few changes because i do not want to rewrite this

import { Message } from "discord.js";
import { afk, config } from ".";
import pms from 'pretty-ms'

export class AFKHandler {
    allowedChannelIds = ['640913665700134912','640734812872769548','651777584127803402','651113562231799828','782319549156032512','640734833605214250','698677442348449822','641777417769189414','641777443610427412','651777710426816523','640913631923404801','705296702479007765','732298122432217139','732298190568554568','782314659822829568','782314762410131476']
    execute(message: Message) {
        if(message.content.startsWith(`${config[message.guild?.id as string].prefix}afk`) && afk[message.author.id] != undefined) return;
        if(message.author.bot) return
        if(afk[message.author.id] != undefined) {
            delete afk[message.author.id];
            message.channel.send("Welcome back, "+ message.author.toString() +"! Removed your afk.").then(msg => {
                setTimeout(() => msg.delete(), 1000)
            });
        }
        var allowedToSend = false;
        this.allowedChannelIds.forEach((id: string) => {
            if(id == message.channel.id) {
                allowedToSend = true;
            }
        });
        if(message.mentions.members != null && allowedToSend) {
            message.mentions.members.forEach(member => {
                if(afk[member.id] != undefined) {
                    var now = new Date();
                    var ms = Math.floor((now.getTime() - afk[member.id].afktime) / 1000) * 1000;
                    var prettyTime = pms(ms, {verbose: true});
                    message.channel.send(message.guild?.members.cache.get(member.id)?.user.username + " is AFK: " + afk[member.id].message + " - " + prettyTime + " ago.");
                }
            });
        }
    }
}