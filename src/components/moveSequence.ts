import { Team } from "./Team";

export function moveSequence(priority: Team){
    let moveSequenceArray: Array<Team> = []
    if (priority === "ally") { 
        moveSequenceArray = ["ally", "enemy", "enemy", "ally"]
    }
    else {
        moveSequenceArray = ["enemy", "ally", "ally", "enemy"]
    }
    return moveSequenceArray
}