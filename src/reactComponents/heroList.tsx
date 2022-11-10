import * as React from 'react';
import { Component } from 'react';
import { arrayBuffer } from 'stream/consumers';
import { CardSchema } from '../data/cardSchema';
import Grid from './grid'


interface Props {
    draftableHeroes: CardSchema[],
    draftableHeroesNames: String[],
    draftableHeroKeyTest: String,
    enemyHeroes: String[],
    allyHeroes: String[]
    onHeroPick: any //MAKE SURE YOU GIVE THIS THE PROPER TYPE!
  }

interface State {}

class HeroList extends React.Component<Props> {
    


 

    render() { 

        //let heroList: Hero[] = heroRoster._heroes THIS IS WHAT IM GOING FOR
        const { allyHeroes, enemyHeroes} = this.props
        let allyStringTest: string[] = ['berserker', 'warrior', 'archer']
        let enemyStringTest: string[] = ['badHero', 'youchas', 'darkKnight']
        let pick = this.props.draftableHeroes
        //console.log(this.props.draftableHeroes)
        let testStringArray: String[] = ['one', 'two', 'three']
        let testObjectArray: Object[] = [{one: 1}, {two: 2}, {three: 3}, {four: 4}]

        //let draftableHeroes = this.props.draftableHeroes
        //draftableHeroes = heroRoster._heroes
        //this.setState({ draftableHeroes });
        






        return ( 
            <div>
                <h1>Draft Pool</h1>
                <div>
                    {this.props.draftableHeroes.map(hero => (
                        <button 
                            onClick={() => this.props.onHeroPick(hero)} 
                            className="btn m-2 btn-primary">{hero.name}</button> 
                    ))}
                </div>
                <h1>Your Team</h1>
                <Grid></Grid>
                <div>
                    {this.props.allyHeroes.map(hero => (
                        <button className="btn m-2 btn-primary">{hero}</button> 
                    ))}
                </div>
                
                <h1>Enemy Team</h1>
                <Grid></Grid>
                <div>
                    {this.props.enemyHeroes.map(hero => (
                        <button className="btn m-2 btn-primary">{hero}</button> 
                    ))}
                </div>
            </div>
        );
    }
}
 
export default HeroList;