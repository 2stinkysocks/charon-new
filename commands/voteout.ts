import { SlashCommandBuilder } from "@discordjs/builders"
import { GuildMemberRoleManager, MessageEmbed, Role, RoleManager, TextChannel } from "discord.js"
import { Command } from "../abstractcommand"

module.exports = class VoteOut extends Command {

    constructor() {
        super(async interaction => {
            if ((interaction.channel as TextChannel).name != `white-star-enlist` && (interaction.channel as TextChannel).name != `private-bot-playground`) return interaction.reply({content:`You can't enlist in this channel!`, ephemeral: true});
            var vcRole = interaction.guild?.roles.cache.find(role => role.name == `vc list`) as Role
            var sosRole = interaction.guild?.roles.cache.find(role => role.name == `sos list`) as Role
            var rsvdRole = interaction.guild?.roles.cache.find(role => role.name == `rsvd list`) as Role
            var alliesRole = interaction.guild?.roles.cache.find(role => role.name == `allies list`) as Role
            var fillRole = interaction.guild?.roles.cache.find(role => role.name == `fill list`) as Role
            (interaction.member?.roles as GuildMemberRoleManager).remove(vcRole).catch(()=>{});
            (interaction.member?.roles as GuildMemberRoleManager).remove(sosRole).catch(()=>{});
            (interaction.member?.roles as GuildMemberRoleManager).remove(rsvdRole).catch(()=>{});
            (interaction.member?.roles as GuildMemberRoleManager).remove(alliesRole).catch(()=>{});
            (interaction.member?.roles as GuildMemberRoleManager).remove(fillRole).catch(()=>{});
            const listEmbed = new MessageEmbed()
            .setColor(`#4287F5`)
            .setDescription(`You have voted out of this week's whitestar list`)
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
            .setName("voteout")
            .setDescription("Unenlist from a White Star")
    }
}