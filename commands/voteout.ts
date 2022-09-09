import { SlashCommandBuilder } from "@discordjs/builders"
import { GuildMemberRoleManager, MessageEmbed, Role, RoleManager, TextChannel } from "discord.js"
import { Command } from "../abstractcommand"

const vcid = '643885054254252042'
const sosid = '643885092099588106'
const rsvdid = '732295056844914799'
const alliesid = '725829245884170270'
const fillid = '642038226734809090'

module.exports = class VoteOut extends Command {

    constructor() {
        super(async interaction => {
            if ((interaction.channel as TextChannel).name != `white-star-enlist` && (interaction.channel as TextChannel).name != `private-bot-playground`) return interaction.reply({content:`You can't enlist in this channel!`, ephemeral: true});
            interaction.deferReply()
            let vcRole = interaction.guild?.roles.cache.find(role => role.name == `vc list`) as Role
            let sosRole = interaction.guild?.roles.cache.find(role => role.name == `sos list`) as Role
            let rsvdRole = interaction.guild?.roles.cache.find(role => role.name == `rsvd list`) as Role
            let alliesRole = interaction.guild?.roles.cache.find(role => role.name == `allies list`) as Role
            let fillRole = interaction.guild?.roles.cache.find(role => role.name == `fill list`) as Role
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
            setTimeout(async () => { 
                await interaction.guild?.members.fetch()
                const vcrole = await (interaction?.guild?.roles as RoleManager).fetch(vcid) as Role
                const sosrole = await (interaction?.guild?.roles as RoleManager).fetch(sosid) as Role
                const rsvdrole = await (interaction?.guild?.roles as RoleManager).fetch(rsvdid) as Role
                const alliesrole = await (interaction?.guild?.roles as RoleManager).fetch(alliesid) as Role
                const fillrole = await (interaction?.guild?.roles as RoleManager).fetch(fillid) as Role
            if(vcrole.members.size > 0) {
                let listString = "";
                vcrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`VC List`, `>>> ${listString}`)
            }
            if(sosrole.members.size > 0) {
                let listString = "";
                sosrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`SOS List`, `>>> ${listString}`)
            }
            if(rsvdrole.members.size > 0) {
                let listString = "";
                rsvdrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`RSVD List`, `>>> ${listString}`)
            }
            if(alliesrole.members.size > 0) {
                let listString = "";
                alliesrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Allies List`, `>>> ${listString}`)
            }
            if(fillrole.members.size > 0) {
                let listString = "";
                fillrole.members.forEach((member: { id: any; user: { tag: string } }) => {
                    if(member.id == interaction.user.id) {
                    listString += "**__" + member.user.tag + "__**\n";
                    } else {
                    listString += member.user.tag + "\n";
                    }
                })
                listEmbed.addField(`Fill List`, `>>> ${listString}`)
            }
            interaction.editReply({embeds: [listEmbed]});
            }, 1000);
        })
        super.builder = new SlashCommandBuilder()
            .setName("voteout")
            .setDescription("Unenlist from a White Star")
    }
}