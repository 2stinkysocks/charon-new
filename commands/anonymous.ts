import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed, Snowflake, TextChannel } from "discord.js"
import { Command } from "../abstractcommand"

module.exports = class Anonymous extends Command {

    channelID: Snowflake = '1006727461163245629'

    constructor() {
        super(async interaction => {
            await interaction.guild?.channels.fetch()
            let channel: TextChannel = interaction.guild?.channels.cache.get(this.channelID) as TextChannel
            channel.send({embeds: [new MessageEmbed()
                .setAuthor(`Anonymous Message`)
                .setDescription(interaction.options.getString("message") as string)
                .setTimestamp(new Date())
                .setFooter("Charon")
                .setColor("#4287F5")
            ]})
            interaction.reply({ephemeral: true, content: "Success!"})
        })
        super.builder = new SlashCommandBuilder()
            .setName("anonymous")
            .addStringOption(option => 
                option.setName("message")
                .setDescription("The message to send anonymously")
                .setRequired(true)
            )
            .setDescription("Send an anonymous message")
    }
}