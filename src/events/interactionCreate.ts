import { Interaction } from "discord.js";
import { Client } from "../Client";
import { Event } from "../models/Event";

module.exports = new class extends Event {
    name: string = "interactionCreate";
    async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;

        const command = (interaction.client as Client).commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.onCommand(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}