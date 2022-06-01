import { Client, ClientUser, Guild, MessageEmbed, Role } from "discord.js";
import { afkhandler, autoresponses, config, recurringVoters } from "..";
import { Listener } from "../abstractlistener";

module.exports = class Message extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('message', message => {
            if(message.author.bot) return

            // image channels
            let memes = client.channels.cache.get('640710843771650068');
            let jukebox = client.channels.cache.get('834217783495098378');
            let vanity = client.channels.cache.get('778401280485359676');
            let imageChannels = new Array();
            imageChannels.push(memes);
            imageChannels.push(jukebox);
            imageChannels.push(vanity);
            imageChannels.forEach(async channel => {
                if(message.channel.id == channel.id) {
                    console.log("found " + channel.id)            
                    if(message.attachments.size == 0 && !(message.content.includes('https://') || message.content.includes('http://'))) {
                        let msg = await message.channel.send({embeds: [
                            new MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('This is a media-only channel!')
                            .setDescription('```\nOnly messages with attachments or embedded links are allowed!\n```')
                        ]})
                        message.delete()
                        setTimeout(async () => {
                            msg.delete()
                        }, 4000)
                    }
                }
            })

            // afk 
            afkhandler.execute(message);

            // autoresponses
            // Object.keys(autoresponses).forEach(function(response){
            //     if(autoresponses[response].wildcard) {
            //     if(message.content.includes(response) && !message.content.startsWith(`${config[message.guild?.id as string].prefix}ar delete`)) {
            //         message.channel.send(autoresponses[response].response + " ");
            //         return;
            //     }
            //     }
            //     if(message.content.startsWith(response)) {
            //     message.channel.send(autoresponses[response].response + " ");
            //     }
            // })                                                              // charon role \/
            // if((message.mentions.users.has(client.user?.id as string) || message.content.includes("714199666538840114")) && message.content.includes("?") && (message.content.toLowerCase().includes("who") || message.content.toLowerCase().includes("what") || message.content.toLowerCase().includes("when") || message.content.toLowerCase().includes("where") || message.content.toLowerCase().includes("why") || message.content.toLowerCase().includes("how") || message.content.toLowerCase().includes("can"))) {
            //     message.channel.send("I can't answer that! I'm not an AI..\n\n..yet")
            // }

            if(message.content == 'triggerautovote' && message.member?.roles.cache.has('640734971107082240')) {
                Object.keys(recurringVoters.users).forEach(value => {
                    var guild = client.guilds.cache.get('640692199557955587') as Guild
                    var listRole = guild.roles.cache.find(role => role.name === recurringVoters.users[value] + " list") as Role
                    guild.members.cache.get(value)?.roles.add(listRole);
                    var random = Math.round(Math.random() * 2); // number to multiply by is 0 - that number
                    switch(random) {
                        case 0:
                            guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/767109348806623252/image0.gif'], content: `It’s time again to battle those that would oppose us! Make them pay for their insolence!\n\nYou have been enlisted into this week's ${recurringVoters.users[value]} White Star!\n\nThe Society thanks you for your continued service! O7~:skull_crossbones:\n\n(In the future, if you want to disable this, you can use **-autovote disable**)`}).catch(()=>{});
                        break;
                        case 1:
                            guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/775442236909420634/image0.png'], content: `Gentlemen, it’s time to polish off that whiskey, finish that last smoke and climb in that rig. We’re taking flight once again to thwart our enemies from stealing what’s rightfully ours!\n\nThe Society appreciates your continued support against all foes!\n\n“You tell him I’m coming! I’m coming and Hell’s coming with me!” ~ Wyatt Earp\n\n:tumbler_glass: ~ :skull_crossbones:\n\n-autovote disable (to turn off autovote)`}).catch(()=>{});
                        break;
                        case 2:
                            guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/778272737470185522/image0.jpg'], content: `Cry Havoc and let slip the Dogs of War!!\n\nFollow me and The DoomSwitch XIII into battle once again!! Let us make our enemies fear the sight of us!\n\nWhite Star scans begin this coming Saturday and you have been automatically enlisted!\n\nWe thank you for your service! Climb aboard your rig, name it, and get ready for a bumpy ride...\n\n:beers:~ :skull_crossbones:\n\n“You take a boat in the air that you don't love, she'll shake you off just as sure as the turning of the worlds. Love keeps her in the air when she oughta fall down, tells you she's hurtin' 'fore she keens. Makes her a home.” ~ Malcolm Reynolds Serenity`}).catch(()=>{});
                        break;   
                     }
                });      
                message.channel.send("Done!");
            }
        })
    }
}