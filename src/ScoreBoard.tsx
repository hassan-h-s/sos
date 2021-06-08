import React from "react";
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import { PlayerInfo } from "./Game";

type ScoreProps = { 
  gameEnd: boolean;
  playerInfo: PlayerInfo[];
}

const useStyles = makeStyles({
  active: {
    background: '#7DCEA0',
  },
  table: {
    fontSize: '20px',
    color: 'darkblue'
  }
});

function ScoreBoard (props: ScoreProps): JSX.Element {

  const classes = useStyles();

  if (!props.gameEnd){
    return renderScoreTable();
  } else {
    return renderGameEndResult();
  }

  /**
   * Returns JSX.Element that is a table of players and scores
   */
  function renderScoreTable(): JSX.Element {
    return (
      <TableContainer>
        <Table className="scoreboard">
          <TableBody >
            {props.playerInfo.map((info, idx) => {
              return (
              <TableRow key={idx} className={info.active ? classes.active : ''}>
                <TableCell className={classes.table}> Player {idx+1} </TableCell>
                <TableCell className={classes.table}> {info.score} </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  /**
   * Returns JSX.Element that is an h1 tag of the final result of the game
   */
  function renderGameEndResult(): JSX.Element {
    return (
      <div>
        {isTie() ? (
          <h1> It's a tie! </h1> ) : (
          <h1> Player {getWinner()} Wins! </h1>
        )}
      </div>
    );
  }

  function isTie(): boolean {
    return props.playerInfo[0].score === props.playerInfo[1].score;
  }

  function getWinner(): number {
    return props.playerInfo[0].score > props.playerInfo[1].score ? 1 : 2;
  }

}

export default ScoreBoard;