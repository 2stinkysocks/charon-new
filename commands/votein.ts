import { SlashCommandBuilder } from "@discordjs/builders"
import { GuildMemberRoleManager, MessageEmbed, Role, RoleManager, TextChannel } from "discord.js"
import { Command } from "../abstractcommand"

module.exports = class VoteIn extends Command {

    constructor() {
        super(async interaction => {
            if ((interaction.channel as TextChannel).name != `white-star-enlist` && (interaction.channel as TextChannel).name != `private-bot-playground`) return interaction.reply({content:`You can't enlist in this channel!`, ephemeral: true});
            let list = interaction.options.getString('list')
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.find(role => role.name == `vc list`)) return interaction.reply({content:`You have voted into vc already!`, ephemeral: true});
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.find(role => role.name == `sos list`)) return interaction.reply({content:`You have voted into sos already!`, ephemeral: true});
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.find(role => role.name == `rsvd list`)) return interaction.reply({content:`You have voted into rsvd already!`, ephemeral: true});
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.find(role => role.name == "allies list")) return interaction.reply({content:`You have voted into allies already!`, ephemeral: true});
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.find(role => role.name == `fill list`)) return interaction.reply({content:`You have voted into fill already!`, ephemeral: true});
            switch (list) {
            case `vc`:
                var role = interaction.guild?.roles.cache.find(role => role.name == `vc list`) as Role
                (interaction.member?.roles as GuildMemberRoleManager).add(role).catch(console.error);
                break;
            case `sos`:
                var role = interaction.guild?.roles.cache.find(role => role.name == `sos list`) as Role
                (interaction.member?.roles as GuildMemberRoleManager).add(role).catch(console.error);
                break;
            case `rsvd`:
                var role = interaction.guild?.roles.cache.find(role => role.name == `rsvd list`) as Role
                (interaction.member?.roles as GuildMemberRoleManager).add(role).catch(console.error);
                break;
            case `allies`:
                var role = interaction.guild?.roles.cache.find(role => role.name == `allies list`) as Role
                (interaction.member?.roles as GuildMemberRoleManager).add(role).catch(console.error);
                break;
            case `fill`:
                var role = interaction.guild?.roles.cache.find(role => role.name == `fill list`) as Role
                (interaction.member?.roles as GuildMemberRoleManager).add(role).catch(console.error);
                break;
            }
            const listEmbed = new MessageEmbed()
            .setColor(`#4287F5`)
            .setDescription(`You have voted into this week's ${list} whitestar list`)
            .setAuthor(`Current Whitestar Lists`)
            .setFooter(`Charon - Society of Sin`, `https://cdn.discordapp.com/app-icons/787495162909032448/8ebf962e89f2d189c9634fcf7395e2af.png?size=256`)
            .setTimestamp(new Date());
            setTimeout(() => { //           \/  (got lazy)
            if((interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `vc list`).members.size > 0) {
                var listString = "";
                (interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `vc list`).members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`VC List`, `>>> ${listString}`)
            }
            if((interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `sos list`).members.size > 0) {
                var listString = "";
                (interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `sos list`).members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`SOS List`, `>>> ${listString}`)
            }
            if((interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `rsvd list`).members.size > 0) {
                var listString = "";
                (interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `rsvd list`).members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`RSVD List`, `>>> ${listString}`)
            }
            if((interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `allies list`).members.size > 0) {
                var listString = "";
                (interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `allies list`).members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Allies List`, `>>> ${listString}`)
            }
            if((interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `fill list`).members.size > 0) {
                var listString = "";
                (interaction?.guild?.roles as any).cache.find((role: { name: string }) => role.name == `fill list`).members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Fill List`, `>>> ${listString}`)
            }
            interaction.reply({embeds: [listEmbed]});
            }, 500);
        })
        super.builder = new SlashCommandBuilder()
            .setName("votein")
            .addStringOption(option => 
                option.setName('list')
                .setRequired(true)
                .addChoices(
                    {name: 'VC', value: 'vc'},
                    {name: 'SOS', value: 'sos'},
                    {name: 'RSVD', value: 'rsvd'},
                    {name: 'Allies', value: 'allies'},
                    {name: 'Fill', value: 'fill'},
                )    
            )
            .setDescription("Enlist in a White Star")
    }
}