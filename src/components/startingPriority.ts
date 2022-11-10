import { Team } from "./Team";

export function startingPriority(): Team {
    let sP = Math.random()
    if (sP < 0.5) {
        return "ally"
    }
    return "enemy"
}