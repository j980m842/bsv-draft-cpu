import { Team } from "./Team";

export function pickSequence(firstpick: Team){
    let pickSequenceArray: Array<Team> = []
    if (firstpick === "ally") { 
        pickSequenceArray = ["ally", "enemy", "enemy", "ally", "ally", "enemy", "enemy", "ally", "ally", "enemy", "enemy", 'ally', 'ally', 'enemy']
    }
    else {
        pickSequenceArray = ["enemy", "ally", "ally", "enemy", "enemy", "ally", "ally", "enemy", "enemy", "ally", "ally", "enemy", "enemy", "ally"]
    }
    return pickSequenceArray
}