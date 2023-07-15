import { GuildMember } from "discord.js";
import { Event } from "../models/Event";
import { Client } from "../Client";

module.exports = new (class extends Event {
  name: string = "guildMemberAdd";
  async execute(member: GuildMember): Promise<void> {
    if (member.user.discriminator !== "0") return; // old username system

    (member.client as Client).updateMemberRoles(member);
  }
})();
