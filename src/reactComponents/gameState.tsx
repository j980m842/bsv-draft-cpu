import * as React from 'react';
import { Component } from 'react';

interface Props {
    draftSequenceIndex: number
    gamePhase: String
    battleRoundSequence: number
    onDraftComplete: any
    onBattleRoundComplete: any
}
 
interface State {
    gameStateReadOut: String
}
 
class GameState extends React.Component<Props, State> {
    state = {
        gameStateReadOut: "Start Draft"
    }

 componentDidUpdate(prevProps: any): any {
    if (prevProps.draftSequenceIndex !== this.props.draftSequenceIndex) {//TRYING TO FIGURE OUT HOW TO UPDATE THIS.STATE.GAMESTATEREADOUT EACH TIME THERE IS A CHANGE IN THE DRAFT SEQUENCE INDEX PROP, OVERALL I WANT A WAY TO TRACK THE PHASE IM IN AND CHANGE WHAT IS GOING ON BASED ON THAT
        let gameStateToString = this.props.draftSequenceIndex
        gameStateToString++
        let gameStateReadOut = gameStateToString.toString()

        this.setState({ gameStateReadOut })
    }
}  

gameStateFormatter = () => {
   if (this.state.gameStateReadOut == "Start Draft") {
        return this.state.gameStateReadOut
   }
    if (this.state.gameStateReadOut == '11') {
        
        let gameStateReadOut = this.state.gameStateReadOut
        console.log(this.props.battleRoundSequence)
        gameStateReadOut = 'Complete Round: ' + this.props.battleRoundSequence
        this.setState({ gameStateReadOut })
        this.props.onDraftComplete()
        return "Draft Complete"
        
    }

    if (this.props.gamePhase === 'battlePhase') {
        return "Complete Round: " + this.props.battleRoundSequence
    }

    return "Next Pick: " + this.state.gameStateReadOut

}





    render() { 
        if (this.props.gamePhase === 'battlePhase') {
            return (
                <button 
                    onClick={() => this.props.onBattleRoundComplete()} 
                    className="btn m-2 btn-primary draft-tile">{this.gameStateFormatter()}
                </button>
            )
        }

        return ( 
            <h1>{this.gameStateFormatter()}</h1>
            
            
         );
    }
}
 
export default GameState;