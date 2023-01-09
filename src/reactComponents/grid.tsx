import * as React from 'react';
import { Component } from 'react';
import { PickPhase } from '../components/pickPhase'
import { BoardPositionSchema } from '../data/boardPositionSchema';
import { GamePhase } from '../components/gamePhase'


interface Props {
  onPlacePick: any
  pickPhase: PickPhase
  board: BoardPositionSchema[]
  gamePhase: GamePhase
  onMoveInitialized: any //CAN I TYPE THIS?
  onMoveCompleted: any
}

class Grid extends React.Component<Props> {


    buttonFunction = (i: number, h: String | null) => {
      if (this.props.gamePhase === 'movePhase' && h === '') { //THESE IFS ARE SO UGLY, HOW DO I MAKE THIS NOT SO UGLY? MAYBE I JUST HIDE THIS IN A MODULE?
        return ''
      }
      if (this.props.gamePhase === 'draftPhase' && h === '') {
        return this.props.onPlacePick(i)
      }
      if (this.props.gamePhase === 'movePhase') {
        return this.props.onMoveInitialized({position: i, hero: h})
      }
      if (this.props.gamePhase === 'moveInitialized') {
        return this.props.onMoveCompleted({position: i, hero: h})
      }
      return '' //I still don't know what to return for onClicks that I don't want to do anything??
    }

    render() { 

        return ( 

          /*//EXPERIMENTAL MAPPYING
          <div className="container">
            {this.props.board.map(hero => (
                        <button 
                            key={hero.position}
                            onClick={() => this.props.onPlacePick(hero.position)} 
                            className="btn m-2 btn-primary">{hero.hero}</button>))} 
          </div>*/
          //EXPERIMENTAL MAPPING



  <div className="hero-tile-grid">
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(0, this.props.board[0].hero)} 
        className="hero-card">{this.props.board[0].hero}
      </button>
    </div>
    <div className="hero-tile">
      <div className="hero-card-container">        
          <img src={require("../images/cards/arcaneMageSplash.jpg")} alt="" />
          <p className='hero-stats'>here are all the stats</p>
          <div className="effect-container">
            <div className="effect-slot">A</div>
            <div className="effect-slot">B</div>
            <div className="effect-slot"><div>D</div></div>
            <div className="effect-slot"></div>
          </div>
          <div className="popup">
            Attack
          </div>
      </div>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(2, this.props.board[2].hero)} 
        className="hero-card">{this.props.board[2].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(3, this.props.board[3].hero)} 
        className="hero-card">{this.props.board[3].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(4, this.props.board[4].hero)} 
        className="hero-card">{this.props.board[4].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(5, this.props.board[5].hero)} 
        className="hero-card">{this.props.board[5].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(6, this.props.board[6].hero)} 
        className="hero-card">{this.props.board[6].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(7, this.props.board[7].hero)} 
        className="hero-card">{this.props.board[7].hero}
      </button>
    </div>
    <div className="hero-tile">
      <button 
        onClick={() => this.buttonFunction(8, this.props.board[8].hero)} 
        className="hero-card">{this.props.board[8].hero}
      </button>
    </div>
  </div>
    
         );
    }
}
 
export default Grid;