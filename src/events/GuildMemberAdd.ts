import { GuildMember } from "discord.js";
import { Event } from "../models/Event";
import { resolve } from "../roles/Resolver";

module.exports = new class extends Event {
    name: string = "guildMemberAdd";
    async execute(member: GuildMember): Promise<void> {
        if(member.user.discriminator !== "0") return;// old username system

        const roles = await resolve(member.user.username);
        
        member.roles.add(roles)
    }
}