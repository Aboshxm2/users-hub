import { Client } from "../Client";
import { Event } from "../models/Event";

module.exports = new class extends Event {
    name: string = "ready";
    once: boolean = true;
    async execute(client: Client): Promise<void> {
        console.log(`Ready! Logged in as ${client.user!.tag}`);

        client.deployCommands();
    }
    
}