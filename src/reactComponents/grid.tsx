import * as React from 'react';
import { Component } from 'react';
import { PickPhase } from '../components/pickPhase'
import { BoardPositionSchema } from '../data/boardPositionSchema';


interface Props {
  onPlacePick: any
  pickPhase: PickPhase
  board: BoardPositionSchema[]
}

class Grid extends React.Component<Props> {

    render() { 

        return ( 

          /*//EXPERIMENTAL MAPPYING
          <div className="container">
            {this.props.board.map(hero => (
                        <button 
                            onClick={() => this.props.onPlacePick(hero.position)} 
                            className="btn m-2 btn-primary">{hero.hero}</button>))} 
          </div>*/
          //EXPERIMENTAL MAPPING


            <div className="container">
  <div className="row">
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(0)} 
        className="btn m-2 btn-primary tile">{this.props.board[0].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(1)} 
        className="btn m-2 btn-primary tile">{this.props.board[1].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(2)} 
        className="btn m-2 btn-primary tile">{this.props.board[2].hero}
      </button>
    </div>
  </div>
  <div className="row">
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(3)} 
        className="btn m-2 btn-primary tile">{this.props.board[3].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(4)} 
        className="btn m-2 btn-primary tile">{this.props.board[4].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(5)} 
        className="btn m-2 btn-primary tile">{this.props.board[5].hero}
      </button>
    </div>
  </div>
  <div className="row">
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(5)} 
        className="btn m-2 btn-primary tile">{this.props.board[6].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(7)} 
        className="btn m-2 btn-primary tile">{this.props.board[7].hero}
      </button>
    </div>
    <div className="col-sm outline">
      <button 
        onClick={() => this.props.onPlacePick(8)} 
        className="btn m-2 btn-primary tile">{this.props.board[8].hero}
      </button>
    </div>
  </div>
</div>
         );
    }
}
 
export default Grid;