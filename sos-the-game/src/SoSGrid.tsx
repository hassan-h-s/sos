import { Grid, } from "@material-ui/core";
import React from "react";
import Square from "./Square";

class SoSGrid extends React.Component {
  render(): JSX.Element {
    const gridIndices = this.generateIndices(6);
    return (
      <Grid container spacing={0}>
        {gridIndices.map((id) => {
          return <Square key={id} idx={id} onValueChange={this.handleValueChange}/>
        })}
      </Grid>
    );
  }

  private handleValueChange = (id: number, value: string) => {
    console.log(`id ${id} was changed to ${value}`);
    // check if it completes SOS
    // if yes, increment current player's score, player continues
    // if not, set turn to other player
    // if grid is full, declare winner/tie
  }

  private generateIndices(size: number): number[] {
    const indices: number[] = [];
    for (let i = 0; i < size; i++){
      for (let j = 0; j < size; j++){
        indices.push((i * size) + j);
      }
    }
    return indices;
  }
}

export default SoSGrid;