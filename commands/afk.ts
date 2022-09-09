import { SlashCommandBuilder } from "@discordjs/builders"
import { afk } from "..";
import { Command } from "../abstractcommand"
import pms from 'pretty-ms'

module.exports = class AFK extends Command {

    constructor() {
        super(interaction => {
            let now = new Date();
            if(afk[interaction.user.id] == undefined) {
                if(interaction.options.getString('message') == null) {
                    afk[interaction.user.id] = {
                        'afktime': now.getTime(),
                        'message': 'AFK'
                    }
                } else {
                    afk[interaction.user.id] = {
                        'afktime': now.getTime(),
                        'message': interaction.options.getString('message') as string
                    }
                }
                interaction.reply(interaction.user.toString() + " I set your AFK: " + afk[interaction.user.id].message)
            } else {
                if(interaction.options.getString('message') == null) {
                    afk[interaction.user.id].afktime = now.getTime()
                    afk[interaction.user.id].message = "AFK"
                } else {
                    afk[interaction.user.id].afktime = now.getTime()
                    afk[interaction.user.id].message = interaction.options.getString('message') as string
                }
                let ms = Math.floor((new Date().getTime() - afk[interaction.user.id].afktime) / 1000) * 1000;
                let prettyTime = pms(ms, {verbose: true});
                interaction.reply("Afk message updated. Current afk time: " + prettyTime)
            }
        })
        super.builder = new SlashCommandBuilder()
            .setName("afk")
            .addStringOption(option => 
                option.setName('message')
                .setDescription("A message to be displayed when pinged")    
            )
            .setDescription("Go AFK")
    }
}