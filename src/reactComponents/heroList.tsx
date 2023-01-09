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
import GameState from './gameState';
import { GamePhase } from '../components/gamePhase'

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
    gamePhase: GamePhase
    onMoveInitialized: any
    onMoveCompleted: any
    onEnemyMoveCompleted: any
  }

interface State {
    allyBoard: BoardPositionSchema[]
    enemyBoard: BoardPositionSchema[]
    selectedPosition: BoardPositionSchema
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
        ],

        selectedPosition: {position: 11, hero: ''}
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

    handleMoveInitialized = (positionInitial: BoardPositionSchema) => {
        console.log("move it! handler activated...")
        let selectedPosition = this.state.selectedPosition
        selectedPosition = positionInitial
        this.setState({ selectedPosition })
        this.props.onMoveInitialized()

    }

    handleMoveCompleted = (positionFinal: BoardPositionSchema) => {
        console.log("handle move completed activated")
        
        let positionInitial = this.state.selectedPosition
        let allyBoard = this.state.allyBoard
        let allyBoardClone = cloneDeep(this.state.allyBoard)

        allyBoardClone[positionInitial.position].hero = allyBoard[positionFinal.position].hero
        allyBoardClone[positionFinal.position].hero = allyBoard[positionInitial.position].hero

        allyBoard = allyBoardClone
        this.setState({ allyBoard })
        this.props.onMoveCompleted()

    }

        
    enemyMove = () => {
        
        let enemyBoardClone = cloneDeep(this.state.enemyBoard)
        let occupiedPositions = enemyBoardClone.filter(h => h.hero !== '')
        console.log(occupiedPositions)
        let indexOne = occupiedPositions[Math.floor(Math.random()*occupiedPositions.length)]
        console.log(indexOne)
        let indexTwo = enemyBoardClone[Math.floor(Math.random()*enemyBoardClone.length)]
        let indexTwoClone = cloneDeep(indexTwo)
        console.log(indexTwo)
        enemyBoardClone[indexTwo.position].hero = indexOne.hero
        console.log(enemyBoardClone)
        enemyBoardClone[indexOne.position].hero = indexTwoClone.hero
        console.log(enemyBoardClone)
        console.log(indexTwoClone.hero)

        let enemyBoard = [...this.state.enemyBoard] 
        enemyBoard = enemyBoardClone
        console.log(enemyBoard)
        this.setState({ enemyBoard })

        this.props.onEnemyMoveCompleted()

    }
    

    render() { 
        
        if (this.props.gamePhase === 'draftPhase' && this.props.currentPick === 'enemy' && this.props.pickPhase === 'placing') {
            this.handleEnemyPlacePick()
            
        }


        if(this.props.gamePhase === 'movePhase' && this.props.currentPick === 'enemy') {
            this.enemyMove()
        }


        return ( 
            <div className="board-container">
                <h1>Draft Pool</h1>
                <div>
                    {this.props.draftableHeroes.map(hero => (
                        <button 
                            key={hero.key}
                            onClick={() => this.props.onHeroPick(hero)} 
                            className="btn m-2 btn-primary">{hero.name}</button> 
                    ))}
                </div>
                <h1>Your Team</h1>
                <Grid
                    pickPhase={this.props.pickPhase}
                    onPlacePick={this.handlePlacePick}
                    onMoveInitialized={this.handleMoveInitialized}
                    onMoveCompleted={this.handleMoveCompleted}
                    board={this.state.allyBoard}
                    gamePhase={this.props.gamePhase}
                />
                
                <h1>Enemy Team</h1>
                <Grid
                    pickPhase={this.props.pickPhase}
                    onPlacePick="" //what am i supposed to do here?
                    onMoveInitialized={this.handleMoveInitialized}
                    onMoveCompleted={this.handleMoveCompleted}
                    board={this.state.enemyBoard}
                    gamePhase={this.props.gamePhase}
                />  
                
            </div>
        );
    }
}
 
export default HeroList;