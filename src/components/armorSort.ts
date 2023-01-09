import { Hero } from "./Hero";
import { Heroes } from "./Heroes";
import { heroRoster } from "./heroRoster";
import { updateDraftRoster } from "./updateDraftRoster";
import { Team } from "./Team";
import { pickSequence } from "./pickSequence";

export function armorSort(): Array<Hero> {
    
    let draftableArmorSort = updateDraftRoster() //will need to add functionality to check which heroes need to be armor sorted based on whether we are in draft, in game, checking allies vs. enemies etc...
    
    draftableArmorSort.sort((a, b) => {
        return b.armor - a.armor;
    });
    return draftableArmorSort
}