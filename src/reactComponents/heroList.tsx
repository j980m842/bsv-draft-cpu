import * as React from 'react';
import { Component } from 'react';
import { arrayBuffer } from 'stream/consumers';
import { CardSchema } from '../data/cardSchema';
import Grid from './grid'
import { PickPhase } from '../components/pickPhase'
import { AnyARecord } from 'dns';
import { Team } from '../components/Team'
import { BoardPositionSchema } from '../data/boardPositionSchema';
import { boardPositionData } from '../data/boardPositionData';
import { heroData } from '../data/heroData';
import cloneDeep from 'lodash/cloneDeep';

interface Props {
    draftableHeroes: CardSchema[],
    draftableHeroesNames: String[],
    draftableHeroKeyTest: String,
    enemyHeroes: String[],
    allyHeroes: String[],
    onHeroPick: any, //MAKE SURE YOU GIVE THIS THE PROPER TYPE!
    pickPhase: PickPhase,
    currentPick: Team,
    onPlaced: any
  }

interface State {
    allyBoard: BoardPositionSchema[]
        
    
    enemyBoard: BoardPositionSchema[]
}



class HeroList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

    this.state = {
        allyBoard: [
            {position: 0, hero: ''},
            {position: 1, hero: ''},
            {position: 2, hero: ''},
            {position: 3, hero: ''},
            {position: 4, hero: ''},
            {position: 5, hero: ''},
            {position: 6, hero: ''},
            {position: 7, hero: ''},
            {position: 8, hero: ''}
        ],


        enemyBoard: [
            {position: 0, hero: ''},
            {position: 1, hero: ''},
            {position: 2, hero: ''},
            {position: 3, hero: ''},
            {position: 4, hero: ''},
            {position: 5, hero: ''},
            {position: 6, hero: ''},
            {position: 7, hero: ''},
            {position: 8, hero: ''}
        ]
    }


}

    handlePlacePick = (place: any) => { //SHOULD CORRECTLY TYPE THIS
        if (this.props.pickPhase === 'placing') { //need a handler in App.JSX that changes phase back to picking
            let index = this.props.allyHeroes.length
            let hero = this.props.allyHeroes[index -1]
            
            let allyBoard = [...this.state.allyBoard]
            allyBoard[place].hero = hero
            this.setState({ allyBoard })
            
            this.props.onPlaced() 

        }
        }

    handleEnemyPlacePick = () => {
  
            let index = this.props.enemyHeroes.length
            let hero = this.props.enemyHeroes[index -1]
            let enemyBoardIndex = cloneDeep(this.state.enemyBoard)
            let emptyPositions = enemyBoardIndex.filter(h => h.hero === '')
            
            let position = emptyPositions[Math.floor(Math.random()*emptyPositions.length)].position
            let enemyBoard = [...this.state.enemyBoard]
            enemyBoard[position].hero = hero
          
            this.setState({ enemyBoard })
            this.props.onPlaced()
    }
    

    render() { 
        
        if (this.props.currentPick === 'enemy' && this.props.pickPhase === 'placing') {
            this.handleEnemyPlacePick()
            
        }

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
                <Grid
                    pickPhase={this.props.pickPhase}
                    onPlacePick={this.handlePlacePick}
                    board={this.state.allyBoard}
                />
                
                <h1>Enemy Team</h1>
                <Grid
                    pickPhase={this.props.pickPhase}
                    onPlacePick="" //what am i supposed to do here?
                    board={this.state.enemyBoard}
                />  
                
            </div>
        );
    }
}
 
export default HeroList;