import React from "react";
import SoSGrid from "./SoSGrid";
import ScoreBoard from "./ScoreBoard";
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
        <SoSGrid onSOS={this.handleSOS} onGridFull={this.handleFullGrid} onTurnEnd={this.handleChangeTurns}/>
        <hr className="solid"></hr>
        <ScoreBoard gameEnd={this.state.gameEnd} players={this.state.players}/>
      </div>
    );
  }

  private handleSOS = () => {
    let playInfo: [IPlayerInfo, IPlayerInfo];
    playInfo = [...this.state.players];
    playInfo.find((p) => p.active)!.score++;
    this.setState({players: playInfo});
  }

  private handleChangeTurns = () => {
    let playInfo: [IPlayerInfo, IPlayerInfo];
    playInfo = [...this.state.players];
    playInfo[0].active = !playInfo[0].active;
    playInfo[1].active = !playInfo[1].active;
    this.setState({players: playInfo});
  }

  private handleFullGrid = () => {
    this.setState({gameEnd: true});
  }
}

export default Game;