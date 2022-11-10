import { Hero } from "./Hero";
import { Heroes } from "./Heroes";
import { heroRoster } from "./heroRoster";
import { updateDraftRoster } from "./updateDraftRoster";
import { Team } from "./Team";
import { startingPriority } from "./startingPriority";
import { pickSequence } from "./pickSequence";
import { armorSort } from "./armorSort";
import { draft, userHeroes, aIHeroes } from "./draftSystem";

export function executeDraft() {

draft();
draft();
draft();
draft();
draft();
draft();
draft();
draft();
draft();
draft();

console.log("user's team is ")
console.log(userHeroes)
console.log("AI's team is ")
console.log(aIHeroes)

let drafted = {
    userHeroes: userHeroes,
    aIHeroes: aIHeroes
}

    return drafted

};

