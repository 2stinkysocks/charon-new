interface APIData {
    id: string
    message?: string
    senddm: boolean
}

export interface AFKData {
    [key: string]: {
        afktime: number
        message: string
    }
}

export interface AutoVoteData {
    users: {
        [key: string]: string
    }
}

export interface ConfigData {
    [key: string]: {
        prefix: string
        welcomemsg: string
    }
}

export interface AutoResponseData {
    [key: string]: {
        response: string
        creatorid: string
        wildcard?: boolean
    }
}

export interface BannedAutoVotersData {
    [key: string]: boolean
}

import { Client, Intents } from 'discord.js'
import fs from 'fs'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import { Command } from './abstractcommand'
import { Listener } from './abstractlistener'
import { AFKHandler } from './afkhandler'
export let afkhandler = new AFKHandler()

import * as _afk from './afk.json'
export let afk = _afk as AFKData
import * as _config from './config.json'
export let config = _config as ConfigData
import * as _recurringVoters from './recurringVoters.json'
export let recurringVoters = _recurringVoters as AutoVoteData
import * as _autoresponses from './autoresponses.json'
export let autoresponses = _autoresponses as AutoResponseData
import * as _bannedAutoVoters from './bannedAutoVoters.json'
export let bannedAutoVoters = _bannedAutoVoters as BannedAutoVotersData

dotenv.config()

const app = express()
app.use(bodyParser.json())

app.listen(8080)

export const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]})

export let commands: Array<Command> = new Array<Command>()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
	const c = require(`./commands/${file.replace('.ts', '')}`)
	commands.push(new c())
}

export let listeners: Array<Listener> = new Array<Listener>()
const listenerFiles = fs.readdirSync('./listeners').filter(file => file.endsWith('.ts'))

for (const file of listenerFiles) {
    const l = require(`./listeners/${file.replace('.ts', '')}`)
    listeners.push(new l(client))
}


client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return
    for(const command of commands) {
        if(command.getName() === interaction.commandName) {
            command.execute(interaction)
        }
    }
})

client.login(process.env.BOT_TOKEN)

app.get("/", (req, res) => {
    res.send("ok");
})

app.post("/afk", (req, res) => {
    let json = req.body as APIData
    if(json.id && json.message) {
        if(client.users.cache.get(json.id)) {
            let now = new Date()
            if(json.message == null) {
                afk[json.id] = {
                    "afktime": now.getTime(),
                    "message": "AFK"
                }
            } else {
                afk[json.id] = {
                    "afktime": now.getTime(),
                    "message": json.message
                }
            }
            fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                if (err) return console.log(err);
            });
            if(json.senddm != null && json.senddm == true) {
                client.users.cache.get(json.id)?.send("Afk message set to `" + json.message + "`")
            }
            res.send("Afk message set to `" + json.message + "`")
        } else {
            res.send("Invalid ID")
        }
    } else {
        res.send("Invalid request")
    }
})

app.post("/back", (req, res) => {
    let json = req.body
    if(json.id) {
        if(client.users.cache.get(json.id)) {
            if(afk[json.id]) {
                delete afk[json.id];
                fs.writeFile('./afk.json', JSON.stringify(afk), function (err) {
                    if (err) return console.log(err);
                });
                if(json.senddm != null && json.senddm == true) {
                    client.users.cache.get(json.id)?.send("Removed your afk!")
                }
                res.send("Removed your afk!")
            } else {
                res.send("That user is not afk")
            }
        } else {
            res.send("Invalid ID")
        }
    } else {
        res.send("Invalid request")
    }
})