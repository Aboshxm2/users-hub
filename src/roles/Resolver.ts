import { FourCharacters, FourCharactersWithSymbol, Repeated, ThreeCharacters, ThreeCharactersWithSymbol, TwoCharacters, TwoCharactersWithSymbol } from "./Roles";

export async function resolve(username: string): Promise<string[]> {
    const roles = [];
    
    switch(username.length) {
        case 2:
            if(username.includes('.') || username.includes('_')) {
                roles.push(TwoCharactersWithSymbol);
                break;
            }

            roles.push(TwoCharacters);
            break;
        case 3:
            if(username.includes('.') || username.includes('_')) {
                roles.push(ThreeCharactersWithSymbol);
                break;
            }

            roles.push(ThreeCharacters);
            break;
        case 4:
            if(username.includes('.') || username.includes('_')) {
                roles.push(FourCharactersWithSymbol);
                break;
            }

            roles.push(FourCharacters);
            break;
    }

    if(username.length <= 4 && /(.)\1\1/.test(username)) {
        roles.push(Repeated)
    }

    return roles;    
}