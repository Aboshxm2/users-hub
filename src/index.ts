const { Events, GatewayIntentBits } = require('discord.js');
import { token } from "../config.json";
import { Client } from "./Client";
import fs from "fs";
import path from "path";
import { Event } from "./models/Event";
import { Command } from "./models/Command";

async function main(){
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath) as Event;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath) as Command;
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }

    client.login(token);
}


main();