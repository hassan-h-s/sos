import React, { useState } from "react";
import SoSGrid from "./SoSGrid";
import ScoreBoard from "./ScoreBoard";
import './Game.css';

export type PlayerInfo = {
  active: boolean,
  score: number
}

function Game (): JSX.Element {
  const player1: PlayerInfo = {active: true, score: 0};
  const player2: PlayerInfo = {active: false, score: 0};
  const [playerInfo, setPlayerInfo] = useState([player1, player2]);
  const [gameEnd, setGameEnd] = useState(false);
  
  return (
    <div className="Game">
      <h1>SOS</h1>
      <p>{getGameInstructions}</p>
      <SoSGrid onSOS={handleSOS} onGridFull={handleFullGrid} onTurnEnd={handleChangeTurns}/>
      <hr className="solid"/>
      <ScoreBoard gameEnd={gameEnd} playerInfo={playerInfo}/>
    </div>
  );

  /**
   * Sets the component state to indicate the end of the game.
   */
  function handleFullGrid(): void {
    setGameEnd(prevGameEnd => true);
  }

  /**
   * Sets the component state to increment the active player's score. 
   */
  function handleSOS(): void {
    let updatedInfo = [...playerInfo];
    updatedInfo.find((p) => p.active)!.score++;
    setPlayerInfo(prevInfo => updatedInfo);
  }
  
  /**
   * Sets the component state to toggle the active player. 
   */
  function handleChangeTurns(): void {
    let updatedInfo = [...playerInfo];
    updatedInfo[0].active = !updatedInfo[0].active;
    updatedInfo[1].active = !updatedInfo[1].active;
    setPlayerInfo(prevInfo => updatedInfo);
  }

  function getGameInstructions(): string {
    return `The object of the game is for each player to attempt to create as many sequences of SOS as they can.
        Take turns to add to a square either an "S" by clicking or an "O" by right-clicking.
        If a player succeeds in creating a sequence, they get another turn. If not, the other player gets to go.
        A sequence can be vertical, horizontal, or diagonal.`
  }
}

export default Game;