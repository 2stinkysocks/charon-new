import { SlashCommandBuilder } from "@discordjs/builders"
import { afk } from "..";
import { Command } from "../abstractcommand"
import pms from 'pretty-ms'
import fs from 'fs'

module.exports = class AFK extends Command {

    constructor() {
        super(async interaction => {
            var now = new Date();
            if(afk[interaction.user.id] == null) {
                if(interaction.options.getString('message') == null) {
                    afk[interaction.user.id] = {
                        "afktime": now.getTime(),
                        "message": "AFK"
                    }
                } else {
                    afk[interaction.user.id] = {
                        "afktime": now.getTime(),
                        "message": interaction.options.getString('message') as string
                    }
                }
                fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                    if (err) return console.log(err);
                });
                interaction.reply(interaction.user.toString() + " I set your AFK: " + afk[interaction.user.id].message)
            } else {
                if(interaction.options.getString('message') == null) {
                    afk[interaction.user.id] = {
                        "afktime": afk[interaction.user.id].afktime,
                        "message": "AFK"
                    }
                } else {
                    afk[interaction.user.id] = {
                        "afktime": afk[interaction.user.id].afktime,
                        "message": interaction.options.getString('message') as string
                    }
                }
                fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                    if (err) return console.log(err);
                });
                var ms = Math.floor((now.getTime() - afk[interaction.user.id].afktime) / 1000) * 1000;
                var prettyTime = pms(ms, {verbose: true});
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