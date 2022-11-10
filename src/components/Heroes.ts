import { Hero } from "./Hero";

export class Heroes {
    constructor(){
    this._heroes = [];
    }

    _heroes: Array<Hero> = [];

    newHero(name: string, health: number, armor: number, speed: number, energy: number): Hero{
        let h = new Hero(name, health, armor, speed, energy)
        this._heroes.push(h);
        //console.log(this._heroes.sort())
        return h
    }

    healthSort(): Array<Hero> {
        let s = this._heroes.sort((a, b) => {
            return b.health - a.health;
        });
        return s
    }

    Find(heroName: string): Hero {
        
        let heroFound = this._heroes.filter(name => name._name === heroName);
        let heroObject: Hero = heroFound[0]
        return heroObject
    }
    


}

