import React from "react";
import SoSGrid from "./SoSGrid";
import Score from "./Score";
import './Game.css';

interface IGameProps { 

}

interface IGameState { 
  gameEnd: boolean;
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps){
    super(props);
    this.state = {
      gameEnd: false
    };
  }

  render() {
    return (
      <div className="Game">
        <h1>SOS</h1>
        <SoSGrid onSOS={this.handlers} onGridFull={this.handleFullGrid.bind(this)} onTurnEnd={this.handlers}/>
        <Score gameEnd={this.state.gameEnd}/>
      </div>
    );
  }

  private handlers(){

  }

  private handleFullGrid(){
    console.log("GRID IS FULL!");
    this.setState({gameEnd: true});
  }
}

export default Game;