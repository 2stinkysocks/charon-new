import { Client } from "discord.js";
import { Listener } from "../abstractlistener";

module.exports = class Error extends Listener {
    constructor(client: Client) {
        super(client)
        super.register('error', e => {
            console.error(e)
        })
    }
}