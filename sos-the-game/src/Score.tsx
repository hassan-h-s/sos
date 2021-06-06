import React from "react";

interface IScoreProps { 
  gameEnd: boolean;
}

interface IScoreState { 
}
class Score extends React.Component<IScoreProps, IScoreState> {
  render() {
    if (this.props.gameEnd){
      return (
        <h2>
          Game Over! Winner is Me!
        </h2>
      )
    } else {
      return (
        <h2>
          Score:
        </h2>
      )
    }
  }
}

export default Score;