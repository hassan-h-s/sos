import React, { useState } from "react";
import SoSGrid from "./SoSGrid";
import ScoreBoard from "./ScoreBoard";
import './Game.css';

export type PlayerInfo = {
  active: boolean,
  score: number
}

function Game () {
  const player1: PlayerInfo = {active: true, score: 0};
  const player2: PlayerInfo = {active: false, score: 0};
  const [playerInfo, setPlayerInfo] = useState([player1, player2]);
  const [gameEnd, setGameEnd] = useState(false);
  
  return (
    <div className="Game">
      <h1>SOS</h1>
      <p>The object of the game is for each player to attempt to create as many sequences of SOS as they can.
        Take turns to add either an "S" (click) or an "O" (right-click) to any square.
        If a player succeeds in creating a sequence, that player continues to take another turn until no
        SOS can be created on their turn. A sequence can be vertical, horizontal, or diagonal.</p>
      <SoSGrid onSOS={handleSOS} onGridFull={handleFullGrid} onTurnEnd={handleChangeTurns}/>
      <hr className="solid"/>
      <ScoreBoard gameEnd={gameEnd} playerInfo={playerInfo}/>
    </div>
  );

  function handleFullGrid() {
    setGameEnd(prevGameEnd => true);
  }

  function handleSOS() {
    let updatedInfo = [...playerInfo];
    updatedInfo.find((p) => p.active)!.score++;
    setPlayerInfo(prevInfo => updatedInfo);
  }
  
  function handleChangeTurns() {
    let updatedInfo = [...playerInfo];
    updatedInfo[0].active = !updatedInfo[0].active;
    updatedInfo[1].active = !updatedInfo[1].active;
    setPlayerInfo(prevInfo => updatedInfo);
  }
}

export default Game;