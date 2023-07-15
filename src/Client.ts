import Discord, {
  GuildMember,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { Command } from "./models/Command";
import { resolve } from "./roles/Resolver";
import {
  FourCharacters,
  FourCharactersWithSymbol,
  Repeated,
  ThreeCharacters,
  ThreeCharactersWithSymbol,
  TwoCharacters,
  TwoCharactersWithSymbol,
  Word,
} from "./roles/Roles";

export class Client extends Discord.Client {
  public commands: Map<string, Command> = new Map();
  public guildId?: string; // usershub guild id

  public async deployCommands() {
    const rest = new REST().setToken(this.token!);
    try {
      console.log(`Started refreshing application (/) commands.`);

      const newCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
      this.commands.forEach((command: Command) => {
        newCommands.push(command.data.toJSON());
      });

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(Routes.applicationCommands(this.user!.id), {
        body: newCommands,
      });

      console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  }

  public async updateMemberRoles(member: GuildMember) {
    const roles = await resolve(member.user);
    const toRemove = [];

    for (const r of [
      TwoCharacters,
      TwoCharactersWithSymbol,
      ThreeCharacters,
      ThreeCharactersWithSymbol,
      FourCharacters,
      FourCharactersWithSymbol,
      Repeated,
      Word,
    ]) {
      // TODO find a better way to do this
      if (roles.indexOf(r) === -1) {
        toRemove.push(r);
      }
    }

    if (member.roles.cache.hasAny(...toRemove)) {
      await member.roles.remove(toRemove);
    }

    if (!member.roles.cache.hasAny(...roles)) {
      await member.roles.add(roles);
    }
  }
}
