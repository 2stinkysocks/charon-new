import { SlashCommandBuilder } from "@discordjs/builders"
import { CacheType, GuildMember, GuildMemberRoleManager, Interaction, Role } from "discord.js"
import { Command } from "../abstractcommand"

module.exports = class ClearList extends Command {

    constructor() {
        super(async interaction => {
            if(!(interaction.member?.roles as GuildMemberRoleManager).cache.has('640734971107082240')) return interaction.reply({content: "You don't have permission to do that!", ephemeral: true})
            await interaction.guild?.members.fetch()
            if(interaction.options.getString('list') === 'all') {
                this.clear(interaction, 'vc list')
                this.clear(interaction, 'sos list')
                this.clear(interaction, 'rsvd list')
                this.clear(interaction, 'allies list')
                this.clear(interaction, 'fill list')
            } else {
                this.clear(interaction, interaction.options.getString('list') as string)
            }
        })
        super.builder = new SlashCommandBuilder()
            .setName("clearlist")
            .addStringOption(option =>
                option.setName('list')
                .setDescription('Which list to clear')
                .setRequired(true)
                .addChoices(
                    {name: 'vc list', value: 'vc list'},
                    {name: 'sos list', value: 'sos list'},
                    {name: 'rsvd list', value: 'rsvd list'},
                    {name: 'allies list', value: 'allies list'},
                    {name: 'fill list', value: 'fill list'},
                    {name: 'all', value: 'all'},
                )    
            )
            .setDescription("Clear one or more lists")
    }

    async clear(interaction: Interaction<CacheType>, name: string) {
        interaction.guild?.members.cache.forEach(member => {
            member.roles.remove(interaction.guild?.roles.cache.find(role => role.name === name) as Role).catch(() => {})
        })
    }
}