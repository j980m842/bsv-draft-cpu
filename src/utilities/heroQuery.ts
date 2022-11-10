import { heroData } from "../data/heroData"
import { CardSchema } from '../data/cardSchema';


export function heroQuery(hero: String) {
    let result = heroData.find(h => h.key === hero)
    return result
}