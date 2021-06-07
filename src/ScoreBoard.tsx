import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import { IPlayerInfo } from './Game';

interface IScoreProps { 
  gameEnd: boolean;
  players: [IPlayerInfo, IPlayerInfo];
}


class ScoreBoard extends React.Component<IScoreProps> {
  render() {
    if (!this.props.gameEnd){
        return this.renderScoreTable();
    } else {
        return this.renderGameEndResult();
    }
  }

  private renderScoreTable(): JSX.Element {
    let activePlayer = {
      backgroundColor: '#7DCEA0'
    };

    return (
      <TableContainer>
        <Table className="scoreboard">
          <TableBody>
            {this.props.players.map((info, idx) => {
              return (
              <TableRow key={idx} style={info.active ? activePlayer : {}}>
                <TableCell> Player {idx+1} </TableCell>
                <TableCell> {info.score} </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  private renderGameEndResult(): JSX.Element {
    return (
      <div>
        {this.isTie() ? (
          <h1> It's a tie! </h1> ) : (
          <h1> Player {this.getWinner()} Wins! </h1>
        )}
      </div>
    );
  }

  private isTie(): boolean {
    return this.props.players[0].score === this.props.players[1].score;
  }

  private getWinner(): number {
    return this.props.players[0].score > this.props.players[1].score ? 1 : 2;
  }
}

export default ScoreBoard;