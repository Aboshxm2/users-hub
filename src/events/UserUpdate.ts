import { User } from "discord.js";
import { Event } from "../models/Event";
import { Client } from "../Client";

module.exports = new class extends Event {
    name: string = "userUpdate";
    async execute(_: User, newUser: User): Promise<void> {
        const g = newUser.client.guilds.cache.get((newUser.client as Client).guildId!)!;
        
        const member = await g.members.fetch(newUser.id);
       
        if(!member) return;

        (member.client as Client).updateMemberRoles(member);
    }
}