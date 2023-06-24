import Discord, { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { Command } from './models/Command';

export class Client extends Discord.Client {
    public commands: Map<string, Command> = new Map();

    public async deployCommands() {
        const rest = new REST().setToken(this.token as string);
        try {
            console.log(`Started refreshing application (/) commands.`);

            const newCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
            this.commands.forEach((command: Command) => {
                newCommands.push(command.data.toJSON());
            })

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(this.user!.id),
                { body: newCommands },
            );

            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
}