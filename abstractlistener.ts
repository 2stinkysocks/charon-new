import { Awaitable, Client, ClientEvents } from "discord.js";

export class Listener {

    client: Client

    constructor(client: Client) {
        this.client = client
    }

    register<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
        this.client.on(event, listener)
    }
}