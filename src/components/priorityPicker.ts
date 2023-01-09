import { Team } from "./Team";

export function priorityPicker() {
    let result = Math.random()*2
    console.log(result)
    let p: Team = 'ally'
    if (result >= 1) {
     p = 'ally' 
    } else {
      p = 'enemy'
    }
    return p
  }