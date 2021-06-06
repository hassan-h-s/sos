import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import { IPlayerInfo } from './Game';
import './Score.css'

interface IScoreProps { 
  gameEnd: boolean;
  players: [IPlayerInfo, IPlayerInfo];
}

class Score extends React.Component<IScoreProps> {
  render() {
    if (this.props.gameEnd){
      return (
        <h2>
          Game Over! Winner is Me!
        </h2>
      )
    } else {
      return this.renderResultsTable();
    }
  }

  private renderResultsTable(): JSX.Element{
    return (
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                Player 1
              </TableCell>
              <TableCell>
                Player 2
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {this.props.players[0].score}
              </TableCell>
              <TableCell>
                {this.props.players[1].score}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default Score;