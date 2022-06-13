import { Client, Guild, Role } from "discord.js";
import { AutoVoteData, commands, recurringVoters } from "..";
import { Listener } from "../abstractlistener";
import cron from 'node-cron'

module.exports = class Ready extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('ready', () => {
            console.log("Bot has started in " + client.guilds.cache.size + " guilds.")
            try {
                if(process.env.ENV === "production") {
                    for(const command of commands) {
                        client.application?.commands.create(command.getJSON())
                        console.log("Registered global command: " + command.getName())
                    }
                } else {
                    const guild = client.guilds.cache.get(process.env.TEST_GUILD_ID as string)
                    for(const command of commands) {
                        guild?.commands.create(command.getJSON())
                        console.log("Registered local command: " + command.getName())
                    }
                }
            } catch(e) {
                console.error(e)
            }
        })
        client.user?.setActivity(`you enlist! | -help`, { type : 'WATCHING'});


        cron.schedule('30 20 * * monday', () => {
            Object.keys(recurringVoters.users).forEach(value => {
                let guild = client.guilds.cache.get('640692199557955587') as Guild;
                let listRole = guild.roles.cache.find(role => role.name === recurringVoters.users[value] + " list") as Role;
                guild.members.cache.get(value)?.roles.add(listRole);
                let random = Math.round(Math.random() * 2); // number to multiply by is 0 - that number
                switch(random) {
                   case 0:
                       guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/767109348806623252/image0.gif'], content: `It’s time again to battle those that would oppose us! Make them pay for their insolence!\n\nYou have been enlisted into this week's ${recurringVoters.users[value]} White Star!\n\nThe Society thanks you for your continued service! O7~:skull_crossbones:\n\n(In the future, if you want to disable this, you can use **/autovote disable**)`}).catch(()=>{});
                   break;
                   case 1:
                       guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/775442236909420634/image0.png'], content: `Gentlemen, it’s time to polish off that whiskey, finish that last smoke and climb in that rig. We’re taking flight once again to thwart our enemies from stealing what’s rightfully ours!\n\nThe Society appreciates your continued support against all foes!\n\n“You tell him I’m coming! I’m coming and Hell’s coming with me!” ~ Wyatt Earp\n\n:tumbler_glass: ~ :skull_crossbones:\n\n/autovote disable (to turn off autovote)`}).catch(()=>{});
                   break;
                   case 2:
                       guild.members.cache.get(value)?.send({files: ['https://cdn.discordapp.com/attachments/640704506014728204/778272737470185522/image0.jpg'], content: `Cry Havoc and let slip the Dogs of War!!\n\nFollow me and The DoomSwitch XIII into battle once again!! Let us make our enemies fear the sight of us!\n\nWhite Star scans begin this coming Saturday and you have been automatically enlisted!\n\nWe thank you for your service! Climb aboard your rig, name it, and get ready for a bumpy ride...\n\n:beers:~ :skull_crossbones:\n\n“You take a boat in the air that you don't love, she'll shake you off just as sure as the turning of the worlds. Love keeps her in the air when she oughta fall down, tells you she's hurtin' 'fore she keens. Makes her a home.” ~ Malcolm Reynolds Serenity`}).catch(()=>{});
                   break;   
                }
            });
          });
    }
}