import { Team } from "../components/Team";

export function prioritySwitch(p: Team) {
    if (p === 'enemy') {
        return 'ally'
    }
    return 'enemy'
  }