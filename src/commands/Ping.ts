import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";
import { Command } from "../models/Command";

module.exports = new class extends Command {
    data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription('Replies with Pong!')

    async onCommand(interaction: CommandInteraction<CacheType>): Promise<void> {
        interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`);
    }
}