import * as React from 'react';
import './App.css';
import HeroList from "./reactComponents/heroList"
import { heroData } from './data/heroData';
import { heroQuery } from './utilities/heroQuery';
import { CardSchema } from './data/cardSchema';
import { pickSequence } from './components/pickSequence';
import { Team } from './components/Team';
import { PickPhase } from './components/pickPhase'

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
  pickPhase: PickPhase
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
    pickPhase: 'picking'
}
}

componentDidMount() {

  function priorityPicker() {
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

  let priority: Team = this.state.priority 
  priority = priorityPicker()
  this.setState({ priority });

  let draftSequence: Team[] = pickSequence(this.state.priority)
  this.setState({ draftSequence })

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
   

render() {
 
  // I NEED TO CHECK IF ITS PICKING OR PLACING PHASE AND THEN PUT IN LOGIC TO ACCOMODATE TIMING
  console.log(this.state.pickPhase +  " -- " + this.state.currentPick)

  if (this.state.pickPhase === 'picking' && this.state.currentPick === 'enemy' ) {
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
        <HeroList
          allyHeroes={this.state.allyHeroes}
          enemyHeroes={this.state.enemyHeroes}
          draftableHeroes={this.state.draftableHeroes}
          draftableHeroesNames={this.state.draftableHeroesNames}
          draftableHeroKeyTest={this.state.draftableHeroKeyTest}
          currentPick={this.state.currentPick}

          onHeroPick={this.handleHeroPick}
          pickPhase={this.state.pickPhase}
          onPlaced={this.handlePlaced}
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

