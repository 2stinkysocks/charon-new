import { SlashCommandBuilder } from "@discordjs/builders"
import { GuildMember, GuildMemberRoleManager, User } from "discord.js";
import { bannedAutoVoters, client, recurringVoters } from "..";
import { Command } from "../abstractcommand"
import fs from 'fs'

module.exports = class AutoVote extends Command {

    constructor() {
        super(async interaction => {
            //if(!message.member.roles.some(role => role.name === 'Charon Tester')) return message.channel.send("This is currently a beta-only feature!");

            if(bannedAutoVoters[interaction.user.id] == true) return interaction.reply({content: "You are currently banned from using this feature. Contact an Officer if you believe this is an error.", ephemeral: true});
            
            // let name = args.join(" ").slice(args[0].length).trim().toLowerCase();
            if(interaction.options.getString('operation') == "ban") {
                let userToBan = interaction.options.getMember('user') as GuildMember
                if(!(interaction.member?.roles as GuildMemberRoleManager).cache.some(role => role.name === "Officer")) return interaction.reply({content: "This is an Officer only command!", ephemeral: true});
                if(bannedAutoVoters[userToBan.id] == true) return interaction.reply({content: "This user is already banned!", ephemeral: true});
                bannedAutoVoters[userToBan.id] = true;
                fs.writeFile('./bannedAutoVoters.json', JSON.stringify(bannedAutoVoters), function (err) {
                if (err) return console.log(err);
                });
                delete recurringVoters.users[userToBan.id] as any;
                interaction.reply(`${userToBan.user.username} is now banned`);
                return;
            } else if(interaction.options.getString('operation') == "unban") {
                let userToUnban = interaction.options.getMember('user') as GuildMember
                if(!(interaction.member?.roles as GuildMemberRoleManager).cache.some(role => role.name === "Officer")) return interaction.reply({content: "This is an Officer only command!", ephemeral: true});
                if(bannedAutoVoters[userToUnban.id] == false || bannedAutoVoters[userToUnban.id] == null) return interaction.reply({content: "This user is not banned!", ephemeral: true});
                bannedAutoVoters[userToUnban.id] = false;
                fs.writeFile('./bannedAutoVoters.json', JSON.stringify(bannedAutoVoters), function (err) {
                if (err) return console.log(err);
                });
                interaction.reply(`${userToUnban.user.username} is now unbanned`);
                return;
            }

            if(interaction.options.getString('operation') == 'list') {
                let autovoteList = "";
                await interaction.guild?.members.fetch()
                Object.keys(recurringVoters.users).forEach(async voter => {
                    let currentVoter = client.users.cache.get(voter) as User
                    autovoteList += recurringVoters.users[voter] + ' - ' + currentVoter.tag + '\n';
                });
                if(autovoteList == "") return interaction.reply({content: "There are no current autovoters for any list!", ephemeral: false});
                interaction.reply({embeds: [{
                color:4360181,
                title:`Current Autovoters`,
                description: autovoteList
                }]});        
                return;
            }

            if(interaction.options.getString('operation') == "enable") {
                if(recurringVoters.users[interaction.user.id] != null) return interaction.reply({content: `You are already set to vote in automatically to the ${recurringVoters.users[interaction.user.id]} list!`, ephemeral: true});
                if(!interaction.options.getString('list')) return interaction.reply({content: "You have to specify a list to vote in to! (vc, sos, rsvd, allies, fill)", ephemeral: true});
                let list = interaction.options.getString('list')?.toLowerCase() as string
                recurringVoters.users[interaction.user.id] = list
                fs.writeFile('./recurringVoters.json', JSON.stringify(recurringVoters), function (err) {
                if (err) return console.log(err);
                });
                interaction.reply({content: `**You are now set to vote in to the ${interaction.options.getString('list')} list each week.**`, ephemeral: false});
            } else if(interaction.options.getString('operation') == "disable") {
                if(recurringVoters.users[interaction.user.id] == null) return interaction.reply({content: `You are not currently set to vote in automatically!`, ephemeral: true});
                delete recurringVoters.users[interaction.user.id] as any;
                fs.writeFile('./recurringVoters.json', JSON.stringify(recurringVoters), function (err) {
                if (err) return console.log(err);
                });
                interaction.reply(`**You will no longer be automatically voted in to a list.**`);
            }
        })
        super.builder = new SlashCommandBuilder()
            .setName("autovote")
            .addStringOption(option =>
                option.setName('operation')
                .setDescription('The operation to execute')
                .setRequired(true)
                .addChoices(
                    {name: 'enable', value: 'enable'},
                    {name: 'disable', value: 'disable'},
                    {name: 'list', value: 'list'},
                    {name: 'ban', value: 'ban'},
                    {name: 'unban', value: 'unban'}
                )    
            )
            .addStringOption(option =>
                option.setName('list')
                .setDescription('The list to vote into')
                .addChoices(
                    {name: 'VC', value: 'vc'},
                    {name: 'SOS', value: 'sos'},
                    {name: 'RSVD', value: 'rsvd'},
                    {name: 'Allies', value: 'allies'},
                    {name: 'Fill', value: 'fill'}
                ) 
            )
            .addUserOption(option => 
                option.setName('user')
                .setDescription("The user to ban/unban (optional)")    
            )
            .setDescription("Enable/Disable autovote")
    }
}