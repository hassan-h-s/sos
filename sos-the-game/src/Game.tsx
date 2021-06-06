import React from "react";
import SoSGrid from "./SoSGrid";
import Score from "./Score";
import './Game.css';

interface IGameProps {}

interface IGameState { 
  gameEnd: boolean;
  players: [IPlayerInfo, IPlayerInfo]
}

export interface IPlayerInfo {
  active: boolean,
  score: number
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps){
    super(props);
    this.state = {
      gameEnd: false,
      players: [{
        active: true,
        score: 0
      },
      {
        active: false,
        score: 0
      }]
    };
  }

  render() {
    return (
      <div className="Game">
        <h1>SOS</h1>
        <SoSGrid onSOS={this.handlers} onGridFull={this.handleFullGrid.bind(this)} onTurnEnd={this.handlers}/>
        <Score gameEnd={this.state.gameEnd} players={this.state.players}/>
      </div>
    );
  }

  private handlers(){

  }

  private handleFullGrid(){
    this.setState({gameEnd: true});
  }
}

export default Game;