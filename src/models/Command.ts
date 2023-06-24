import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export abstract class Command {
    abstract data: SlashCommandBuilder;
    abstract onCommand(interaction: CommandInteraction) : Promise<void>;
}