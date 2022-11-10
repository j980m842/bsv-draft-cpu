import { Hero } from "./Hero";
import { heroRoster } from "./heroRoster";


export function updateDraftRoster(): Array<Hero> {
    let draftableHeroes: Array<Hero> = heroRoster._heroes.filter(draftable => draftable._draftable === true)
    return draftableHeroes
}