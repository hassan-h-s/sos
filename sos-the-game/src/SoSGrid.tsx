import { Grid, } from "@material-ui/core";
import React from "react";
import Square from "./Square";

class SoSGrid extends React.Component {
  render(): JSX.Element {
    const gridIndices = this.generateIndices(6);
    return (
      <Grid container spacing={0}>
        {gridIndices.map((id) => {
          return <Square key={id} idx={id}/>
        })}
      </Grid>
    );
  }

  private generateIndices(size: number): number[] {
    const indices: number[] = [];
    for (let i = 1 ; i < size + 1 ; i++){
      for (let j = 1 ; j < size + 1; j++){
        indices.push((i-1) * size + j);
      }
    }
    return indices;
  }
}

export default SoSGrid;