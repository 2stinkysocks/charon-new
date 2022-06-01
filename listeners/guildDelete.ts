import { Client } from "discord.js";
import { config } from "..";
import { Listener } from "../abstractlistener";
import fs from 'fs'

module.exports = class GuildDelete extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('guildDelete', guild => {
            console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
            delete config[guild.id];
            fs.writeFile('./config.json', JSON.stringify(config), function (err) {
                if (err) return console.log(err);
            });
        })
    }
}