import { Client } from "../Client";
import { Event } from "../models/Event";

module.exports = new (class extends Event {
  name: string = "ready";
  once: boolean = true;
  async execute(client: Client): Promise<void> {
    console.log(`Ready! Logged in as ${client.user!.tag}`);

    await client.deployCommands();

    await updateMembersRoles(client);
  }
})();

async function updateMembersRoles(client: Client) {
  console.log("Starting the updating process.");
  console.log("Fetching members...");
  const fStart = Date.now();

  const members = await client.guilds.cache
    .get(client.guildId!)!
    .members.fetch();

  console.log(
    `Finished fetching ${members.size} members (${Date.now() - fStart}ms).`
  );
  console.log("Starting the role updating process.");

  const uStart = Date.now();

  let membersCount = 0;

  for (const [_, member] of members) {
    await client.updateMemberRoles(member);

    membersCount++;

    if (membersCount % 500 === 0) {
      console.log(
        `Finished updating roles for ${membersCount} members (${
          Date.now() - uStart
        }ms).`
      );
    }
  }

  if (membersCount % 500 !== 0) {
    console.log(
      `Finished updating roles for ${membersCount} members (${
        Date.now() - uStart
      }ms).`
    );
  }

  console.log(`Finished the updating process (${Date.now() - fStart}ms).`);
}
