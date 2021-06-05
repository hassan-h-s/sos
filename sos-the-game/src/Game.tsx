import React from "react";
import SoSGrid from "./SoSGrid";
import Reset from "./Reset";
import Score from "./Score";
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="Game">
        <h1>SOS</h1>
        <SoSGrid />
        <Score />
        <Reset />
      </div>
    );
  }
}

export default Game;