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
    heroTrickery: BoardPositionSchema[]
        
    
    enemyBoard: BoardPositionSchema[]
}



class HeroList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

    this.state = {
        allyBoard: [/*
            {position: 0, hero: null},
            {position: 1, hero: null},
            {position: 2, hero: null},
            {position: 3, hero: null},
            {position: 4, hero: null},
            {position: 5, hero: null},
            {position: 6, hero: null},
            {position: 7, hero: null},
            {position: 8, hero: null}*/
        ],
        heroTrickery: [/*
            {position: 0, hero: 'spray'}, 
            {position: 1, hero: null}, 
            {position: 2, hero: 'working'}, 
            {position: 3, hero: 'exuberant'}, 
            {position: 4, hero: 'destruction'}, 
            {position: 5, hero: 'null'},
            {position: 6, hero: 'null'},
            {position: 7, hero: 'null'},
            {position: 8, hero: 'null'},*/
        ],


        enemyBoard: [/*
            {position: 0, hero: null},
            {position: 1, hero: 'null'},
            {position: 2, hero: 'null'},
            {position: 3, hero: 'null'},
            {position: 4, hero: 'null'},
            {position: 5, hero: 'null'},
            {position: 6, hero: 'null'},
            {position: 7, hero: 'null'},
            {position: 8, hero: 'null'},*/
        ]
    }


    //console.log(allyBoard)
}

    componentDidMount = () => {

        let allyBoard = this.state.allyBoard
        allyBoard = boardPositionData
        this.setState({ allyBoard });
        //console.log(allyBoard)

        let enemyBoard = this.state.enemyBoard
        enemyBoard = boardPositionData
        this.setState({ enemyBoard });

        let heroTrickery = this.state.heroTrickery
        heroTrickery = boardPositionData
        this.setState({ heroTrickery });


    }

    handlePlacePick = (place: any) => { //SHOULD CORRECTLY TYPE THIS
        if (this.props.pickPhase === 'placing') { //need a handler in App.JSX that changes phase back to picking
            let index = this.props.allyHeroes.length
            let hero = this.props.allyHeroes[index -1]
            
            let allyBoard = [...this.state.allyBoard]
            allyBoard[place].hero = hero
            this.setState({ allyBoard })
            
            this.props.onPlaced() //ITERATING BETWEEN PLACING AND PICKING IS NOT WORKING

        }
        }

    handleEnemyPlacePick = () => {
        //EXPERIMENTAL
            let index = this.props.enemyHeroes.length
            let hero = this.props.enemyHeroes[index -1]
            let enemyBoardIndex = [...this.state.enemyBoard]
            //console.log(enemyBoardIndex)
            const filtered = enemyBoardIndex.filter(h => h.hero === '')
            
           // console.log(filtered)
            
            let position = enemyBoardIndex[Math.floor(Math.random()*enemyBoardIndex.length)].position
            let enemyBoard = [...this.state.enemyBoard]
            enemyBoardIndex[position].hero = hero
/*
            let test = [...this.state.heroTrickery]
            console.log(test)
            let testFiltered = test.filter(h => h.hero === '')
            console.log(testFiltered)*/
/*
            let hTest: {position: number, hero: String | null }[] = [
                {position: 0, hero: 'spray'}, 
                {position: 1, hero: null}, 
                {position: 2, hero: 'working'}, 
                {position: 3, hero: 'exuberant'}, 
                {position: 4, hero: 'destruction'}, 
                {position: 5, hero: null},
                {position: 6, hero: 'null'},
                {position: 7, hero: null},
                {position: 8, hero: 'null'},
            ]
            */

            let hTest = boardPositionData
            let result = hTest.filter(h => h.hero == '');
            console.log('filtered: ')
            console.log(result);

            

        //EXPERIMENTAL

/*
            let index = this.props.enemyHeroes.length
            let hero = this.props.enemyHeroes[index -1]
            let place = Math.floor(Math.random()*8)
            
            let enemyBoard = [...this.state.enemyBoard]
            console.log(enemyBoard[place])
            if (enemyBoard[place].hero === null) {
                enemyBoard[place].hero = hero
            }
            */
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