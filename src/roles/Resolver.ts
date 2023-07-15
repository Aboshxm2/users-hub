import { User } from "discord.js";
import {
  BugHunterLevel1,
  BugHunterLevel2,
  Developer,
  DiscordModerator,
  EarlySupporter,
  FourCharacters,
  FourCharactersWithSymbol,
  Hypesquad,
  Partner,
  Repeated,
  ThreeCharacters,
  ThreeCharactersWithSymbol,
  TwoCharacters,
  TwoCharactersWithSymbol,
  Users,
} from "./Roles";

export async function resolve(user: User): Promise<string[]> {
  const roles = [];

  roles.push(Users);

  if (user.discriminator === "0") {
    const username = user.username;

    switch (username.length) {
      case 2:
        if (username.includes(".") || username.includes("_")) {
          roles.push(TwoCharactersWithSymbol);
          break;
        }

        roles.push(TwoCharacters);
        break;
      case 3:
        if (username.includes(".") || username.includes("_")) {
          roles.push(ThreeCharactersWithSymbol);
          break;
        }

        roles.push(ThreeCharacters);
        break;
      case 4:
        if (username.includes(".") || username.includes("_")) {
          roles.push(FourCharactersWithSymbol);
          break;
        }

        roles.push(FourCharacters);
        break;
    }

    if (username.length <= 4 && /(.)\1\1/.test(username)) {
      roles.push(Repeated);
    }
  }

  if (user.flags?.has("Partner")) {
    roles.push(Partner);
  }
  if (user.flags?.has("CertifiedModerator")) {
    roles.push(DiscordModerator);
  }
  if (user.flags?.has("BugHunterLevel2")) {
    roles.push(BugHunterLevel2);
  }
  if (user.flags?.has("BugHunterLevel1")) {
    roles.push(BugHunterLevel1);
  }
  if (user.flags?.has("Hypesquad")) {
    roles.push(Hypesquad);
  }
  if (user.flags?.has("VerifiedDeveloper")) {
    roles.push(Developer);
  }
  if (user.flags?.has("PremiumEarlySupporter")) {
    roles.push(EarlySupporter);
  }

  return roles;
}
