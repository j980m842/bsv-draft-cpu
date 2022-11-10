import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import HeroList from "./reactComponents/heroList"
import { draft, userHeroes, aIHeroes } from "./components/draftSystem";
import { executeDraft } from './components/executeDraft';
import { heroData } from './data/heroData';
import { heroQuery } from './utilities/heroQuery';
import { CardSchema } from './data/cardSchema';
import { EventType, Event } from './data/EventType';
import { pickSequence } from './components/pickSequence';
import { Team } from './components/Team';
import { randomInt } from 'node:crypto';
import { enemyDraftPick } from './utilities/enemyDraftPick';

interface Props {
}
 
interface State {
  eventSequenceIndex: number
  draftableHeroes: CardSchema[],
  draftableHeroesNames: String[],
  draftableHeroKeyTest: String,
  enemyHeroes: String[],
  allyHeroes: String[],
  currentPick: Team,
  priority: Team
  draftSequence: Team[]
  draftSequenceIndex: number
}
 
class App  extends React.Component<Props, State> {
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
    draftSequenceIndex: 0
}
}

componentDidMount() {

  //RIGHT HERE START WORKING ON HOW TO QUERY DATA FROM "HERODATA"
  //WHEN STUCK LOOK INTO REDUCE METHOD FOR ARRAYS

/*
  let draftableHeroes = [...this.state.draftableHeroes]
  draftableHeroes = heroRoster._heroes
  let dHlength = draftableHeroes.length
  let draftableHeroesNames: String[] = []
  for (let i = 0; i < dHlength; i++) {
      draftableHeroesNames.push(draftableHeroes[i]._name)
  }
  this.setState({ draftableHeroesNames });


  
  const allyHeroes = [...this.state.allyHeroes];
  allyHeroes[0] = 'haha';
  const enemyHeroes = [...this.state.enemyHeroes];
  enemyHeroes[0] = 'darkKnight';
  this.setState({ allyHeroes });
  this.setState({ enemyHeroes });
*/
  


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
  //console.log(result?.startingHealth)

  
}



handleHeroPick = (pick: CardSchema) => {
  
  const allyHeroes = this.state.allyHeroes
  allyHeroes.push(pick.name)
  this.setState({ allyHeroes })

  const draftableHeroes = this.state.draftableHeroes.filter(h => h.name !== pick.name);
  this.setState({ draftableHeroes })

  let currentPick = this.state.currentPick
  let draftSequenceIndex = this.state.draftSequenceIndex
  draftSequenceIndex++
  this.setState({ draftSequenceIndex })
  currentPick = this.state.draftSequence[this.state.draftSequenceIndex + 1]
  this.setState({ currentPick })


}

enemyDraftPick = () => {
  let draftableHeroes = this.state.draftableHeroes
  const index = Math.floor(Math.random()*draftableHeroes.length)
  const pick = draftableHeroes[index]

  const enemyHeroes = this.state.enemyHeroes
  enemyHeroes.push(pick.name)
  this.setState({ enemyHeroes })
  console.log('enemy draft pick executed')

  draftableHeroes = this.state.draftableHeroes.filter(h => h.name !== pick.name);
  this.setState({ draftableHeroes })
  
  let currentPick = this.state.currentPick
  let draftSequenceIndex = this.state.draftSequenceIndex
  draftSequenceIndex++
  this.setState({ draftSequenceIndex })
  currentPick = this.state.draftSequence[this.state.draftSequenceIndex + 1]
  this.setState({ currentPick })
  
}
  
   

render() {

  let draftResult = executeDraft();
  let attacker = 'fireMage' //WORK NOW ON MAKING HEROQUERY FUNCTION A MODULE AND USING IT WITH THE ONCLICK STUFF
  console.log(this.state.currentPick)
  console.log(this.state.draftSequenceIndex)
  console.log(this.state.draftSequence[this.state.draftSequenceIndex])
  
  if (this.state.currentPick === 'enemy') {
    console.log('re-rendered with current pick == enemy')
    
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

          onHeroPick={this.handleHeroPick}
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

