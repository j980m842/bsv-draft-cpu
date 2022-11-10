import { Hero } from "./Hero";
import { Heroes } from "./Heroes";
import { heroRoster } from "./heroRoster";
import { updateDraftRoster } from "./updateDraftRoster";
import { Team } from "./Team";
import { startingPriority } from "./startingPriority";
import { pickSequence } from "./pickSequence";
import { armorSort } from "./armorSort";



let draftRoster: Array<Hero> = updateDraftRoster()
//SORTING FUNCTIONS WORKING!!
let armorSorted: Array<Hero> = armorSort();
let highestArmor: Array<Hero> = armorSorted.filter(tied => tied._armor === armorSorted[0]._armor)
//console.log(highestArmor)


let healthSorted: Array<Hero> = heroRoster.healthSort();
let highestHealth: Array<Hero> = healthSorted.filter(tied => tied._health === healthSorted[0]._health)
export let userHeroes: Array<string> = []
export let aIHeroes: Array<string> = []

declare function require(name: string): any;

//TRYING TO FIGURE OUT HOW TO MANUALLY INPUT PICKS
/*let prompt = require('prompt');
prompt.start();
await prompt.get(['hero', 'row', 'column', 'bookReadPosition'], function (err: any, result: any) {
  console.log(result.hero);
});
*/

export async function draft() {
    if(currentPick === "ally") {
        /*let prompt = require('prompt');
        prompt.start();
        await prompt.get(['hero', 'row', 'column', 'bookReadPosition'], function (err: any, result: any) {
        console.log('Command-line input received:');
        console.log(result.hero);
        pick(result.hero, result.row, result.column, result.bookReadPosition)
        });*/
        pick(userPicks.shift(0), 2, 2, 5);
        
    }
    else {
        armorSorted = armorSort();
        highestArmor = armorSorted.filter(tied => tied._armor === armorSorted[0]._armor)
        pick(highestArmor[0]._name, 1, 2, 2)

        
    }
}

//DRAFT 

let userPicks: any = ["werewolf", "poisonMage", "iceMage", "blacksmith", "berserker"] // find a way to be able to type this rather than any type!

let firstpick: Team = startingPriority();
//console.log(firstpick)
let pickSequenceArray: Array<Team> = pickSequence(firstpick);
let currentPick: Team = firstpick;
let pickNumber = 0;
//console.log(firstpick);
//console.log(pickSequenceArray);

//this function selects a draftable hero and changes board position, h = hero, r = row, c = column, brp = bookread position
function pick(h: string, r: number, c: number, brp: number) { //I think hero name, row, and column all need to be types
    let picked: Hero = heroRoster.Find(h);
        if (picked._draftable === false) {
            console.log("That hero isn't draftable!");
        } else {
            picked._draftable = false;
            picked._boardPositionRow = r;
            picked._boardPositionColumn = c;
            picked._bookReadPosition = brp;
            if(currentPick === "ally") {
                userHeroes.push(picked._name);
            }
            else {
                aIHeroes.push(picked._name);
            }
            //add functionality to add the selected hero to an actual team's board
        }
        draftRoster = updateDraftRoster();
        pickNumber ++;
        currentPick = pickSequenceArray[pickNumber]
}




















