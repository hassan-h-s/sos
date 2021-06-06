import { Grid, } from "@material-ui/core";
import React from "react";
import Square from "./Square";

type sosSet = [number, number, number];

interface IGridProps {
  onSOS: () => void;
  onGridFull: () => void;
  onTurnEnd: () => void;
}

interface IGridState {
  squares: (string | null)[];
  sosSets: sosSet[];
}

class SoSGrid extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps){
    super(props);
    this.state = {
      squares: Array(36).fill(null),
      sosSets: []
    };
  }

  render(): JSX.Element {
    const gridIndices = this.generateIndices(6);
    return (
      <Grid container spacing={0}>
        {gridIndices.map((id) => {
          return <Square key={id} 
                         idx={id}
                         onValueChange={this.handleSquareChange}/>
        })}
      </Grid>
    );
  }

  private handleSquareChange = (idx: number, value: string) => {
    let squares = [...this.state.squares];
    squares[idx] = value;
    this.setState({squares}, () => {
      this.isSOS(idx);
      if (this.gridIsFull()){
        this.props.onGridFull();
      }
    });
  }

  private isSOS(id: number): boolean {
    // if yes, increment current player's score, player continues
    // this.props.onSOS();
    // if not, set turn to other player
    // this.props.onTurnEnd();
    return true;
  }

  private gridIsFull(): boolean {
    return this.state.squares.indexOf(null) === -1;
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