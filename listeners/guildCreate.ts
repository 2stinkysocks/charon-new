import { Client } from "discord.js";
import { Listener } from "../abstractlistener";
import fs from 'fs'
import { config } from "..";

module.exports = class GuildCreate extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('guildCreate', guild => {
            console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
            config[guild.id].prefix = '-';
              fs.writeFile('./config.json', JSON.stringify(config), function (err) {
                  if (err) return console.log(err);
              });
        })
    }
}