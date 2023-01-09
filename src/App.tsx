import * as React from 'react';
import './App.css';
import HeroList from "./reactComponents/heroList"
import { heroData } from './data/heroData';
import { heroQuery } from './utilities/heroQuery';
import { CardSchema } from './data/cardSchema';
import { pickSequence } from './components/pickSequence';
import { Team } from './components/Team';
import { PickPhase } from './components/pickPhase'
import GameState from './reactComponents/gameState';
import { GamePhase } from './components/gamePhase'
import { priorityPicker } from './components/priorityPicker';
import { prioritySwitch } from './utilities/prioritySwitch';
import { moveSequence } from './components/moveSequence';

interface Props {
}
 
interface State {
  eventSequenceIndex: number
  draftableHeroes: CardSchema[],
  draftableHeroesNames: String[],
  draftableHeroKeyTest: String,
  enemyHeroes: String[],
  allyHeroes: String[], //must change ally heroes and enemy heroes to be arrays of HEROES based on CARDSCHEMA rather than just strings of their names!
  currentPick: Team,
  priority: Team,
  draftSequence: Team[],
  draftSequenceIndex: number,
  moveSequenceIndex: number,
  moveSequenceArray: Team[]
  battleRoundSequence: number,
  pickPhase: PickPhase,
  gamePhase: GamePhase
}
 
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    eventSequenceIndex: 0,
    allyHeroes: [],
    enemyHeroes: [],
    draftableHeroes: [],
    draftableHeroesNames: [],
    draftableHeroKeyTest: '',
    currentPick: 'ally',
    priority: 'ally',
    draftSequence: [],
    draftSequenceIndex: 0,
    moveSequenceIndex: 0,
    moveSequenceArray: [],
    battleRoundSequence: 1,
    pickPhase: 'picking',
    gamePhase: 'draftPhase'
}
}

componentDidMount() {

  let priority: Team = this.state.priority 
  priority = priorityPicker()
  this.setState({ priority });

  let draftSequence: Team[] = pickSequence(priority)
  this.setState({ draftSequence })

  priority = prioritySwitch(priority)

  let currentPick = draftSequence[0]
  this.setState({ currentPick })

  let draftableHeroes = this.state.draftableHeroes
  draftableHeroes = heroData
  this.setState({ draftableHeroes });

  let result = heroQuery('warrior')
  console.log(this.state.draftableHeroes)

  
}



handleHeroPick = (pick: CardSchema) => {
  
  const allyHeroes = this.state.allyHeroes
  allyHeroes.push(pick.name)
  this.setState({ allyHeroes })

  const draftableHeroes = this.state.draftableHeroes.filter(h => h.name !== pick.name);
  this.setState({ draftableHeroes })

  let pickPhase: PickPhase = 'placing'
  this.setState({ pickPhase })



}


enemyDraftPick = () => {

  //Executing the pick
  console.log('why is enemy draft pick being called here?')
  if (this.state.draftSequenceIndex < 10) {
    let draftableHeroes = this.state.draftableHeroes
    const index = Math.floor(Math.random()*draftableHeroes.length)
    const pick = draftableHeroes[index]
  
    const enemyHeroes = this.state.enemyHeroes
    enemyHeroes.push(pick.name)
    this.setState({ enemyHeroes })
    console.log('enemy draft pick executed')
  
    //cleanup and iterating draft sequence
    draftableHeroes = this.state.draftableHeroes.filter(h => h.name !== pick.name);
    this.setState({ draftableHeroes })
    
    
    //placing the picked hero
    let pickPhase: PickPhase = 'placing'
    this.setState({ pickPhase })
  }

  
}

handlePlaced = () => {
  let pickPhase: PickPhase = 'picking'
  this.setState({ pickPhase })

  
  let currentPick = this.state.currentPick
  let draftSequenceIndex = this.state.draftSequenceIndex
  draftSequenceIndex++
  this.setState({ draftSequenceIndex })
  currentPick = this.state.draftSequence[this.state.draftSequenceIndex + 1]
  this.setState({ currentPick })
}

handleDraftComplete = () => {
  console.log("draft complete handler activated")
  let draftableHeroes = this.state.draftableHeroes
  draftableHeroes = []
  this.setState({ draftableHeroes })

  let gamePhase = this.state.gamePhase
  gamePhase = "battlePhase"
  this.setState({ gamePhase })


}

handleBattleRoundComplete = () => {
  console.log("handle battle round complete activated")
  let gamePhase = this.state.gamePhase
  gamePhase = 'movePhase'
  this.setState({ gamePhase })

  let priority = this.state.priority
  priority = prioritySwitch(priority)
  this.setState({ priority })

  let moveSequenceArray = this.state.moveSequenceArray
  moveSequenceArray = moveSequence(this.state.priority)
  this.setState({ moveSequenceArray })
  
  let currentPick: Team = this.state.currentPick
  currentPick = moveSequenceArray[0]
  this.setState({ currentPick })
}

handleMoveInitialized = () => {
  console.log('app.tsx handle move init activated')
  let gamePhase = this.state.gamePhase
  gamePhase = 'moveInitialized'
  this.setState({ gamePhase })
  
}

handleMoveCompleted = () => {
  console.log("app.tsx handle move completed activated")
  let gamePhase = this.state.gamePhase
  gamePhase = 'movePhase'
  this.setState({ gamePhase })
  let moveSequenceIndex = this.state.moveSequenceIndex
  moveSequenceIndex++
  this.setState({ moveSequenceIndex })

  let currentPick = this.state.currentPick
  currentPick = this.state.moveSequenceArray[moveSequenceIndex]
  this.setState({ currentPick })

  if (moveSequenceIndex === 4) {
    moveSequenceIndex = 0
    let gamePhase = this.state.gamePhase
    gamePhase = 'battlePhase'
    let battleRoundSequence = this.state.battleRoundSequence
    battleRoundSequence++
    console.log(battleRoundSequence)
    this.setState({ battleRoundSequence })
    this.setState({ gamePhase })
    this.setState({ moveSequenceIndex })
  }

 
}

handleEnemyMoveCompleted = () => {
  let moveSequenceIndex = this.state.moveSequenceIndex
  moveSequenceIndex++
  this.setState({ moveSequenceIndex })

  let currentPick = this.state.currentPick
  currentPick = this.state.moveSequenceArray[moveSequenceIndex]
  this.setState({ currentPick })

  if (moveSequenceIndex === 4) {
    moveSequenceIndex = 0
    let gamePhase = this.state.gamePhase
    gamePhase = 'battlePhase'
    let battleRoundSequence = this.state.battleRoundSequence
    battleRoundSequence++
    console.log(battleRoundSequence)
    this.setState({ battleRoundSequence })
    this.setState({ gamePhase })
    this.setState({ moveSequenceIndex })
  }
}

render() {
 
  // I NEED TO CHECK IF ITS PICKING OR PLACING PHASE AND THEN PUT IN LOGIC TO ACCOMODATE TIMING
  console.log(this.state.moveSequenceIndex)
  console.log(this.state.currentPick)
  console.log(this.state.moveSequenceArray[this.state.moveSequenceIndex])

  if (this.state.gamePhase === 'draftPhase' && this.state.pickPhase === 'picking' && this.state.currentPick === 'enemy' ) {
    //console.log('re-rendered with current pick == enemy')
    
    this.enemyDraftPick();
  }

  


  return (

    <div className="App">
      <header className="App-header">
        <h1>Brimstone Valley Draft AI</h1>
        <p>
          Pick some Heroes!
        </p>
        <GameState
          draftSequenceIndex={this.state.draftSequenceIndex}
          gamePhase={this.state.gamePhase}
          battleRoundSequence={this.state.battleRoundSequence}
          onDraftComplete={this.handleDraftComplete}
          onBattleRoundComplete={this.handleBattleRoundComplete}
        />
        <HeroList
          allyHeroes={this.state.allyHeroes}
          enemyHeroes={this.state.enemyHeroes}
          draftableHeroes={this.state.draftableHeroes}
          draftableHeroesNames={this.state.draftableHeroesNames}
          draftableHeroKeyTest={this.state.draftableHeroKeyTest}
          currentPick={this.state.currentPick}
          gamePhase={this.state.gamePhase}

          onHeroPick={this.handleHeroPick}
          pickPhase={this.state.pickPhase}
          onPlaced={this.handlePlaced}
          onMoveInitialized={this.handleMoveInitialized}
          onMoveCompleted={this.handleMoveCompleted}
          onEnemyMoveCompleted={this.handleEnemyMoveCompleted}
        />
        
      </header>
      <footer>
      <a
          className="App-link"
          href="https://brimstonevalley.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Brimstone Valley
        </a>
      </footer>
    </div>
  );
}
 
}




export default App;

