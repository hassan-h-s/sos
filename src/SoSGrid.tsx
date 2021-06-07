import { Grid, } from "@material-ui/core";
import React from "react";
import Square from "./Square";

type sosSeq = [number, number, number];

interface IGridProps {
  onSOS: () => void;
  onGridFull: () => void;
  onTurnEnd: () => void;
}

interface IGridState {
  squares: (string | null)[];
}

class SoSGrid extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps){
    super(props);
    this.state = {
      squares: Array(36).fill(null)
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
      if(!this.sosCheckAndUpdate(idx)){
        this.props.onTurnEnd();
      }
      if (this.gridIsFull()){
        this.props.onGridFull();
      }
    });
  }

  private sosCheckAndUpdate(idx: number): boolean {
    const sequences = this.findSequences(idx);
    if (sequences.length){
      sequences.forEach((s) => {
        this.props.onSOS();
      });
      return true;
    }
    return false;
  }

  private findSequences(idx: number): sosSeq[] {
    let sequences: sosSeq[] = [];
    const value = this.state.squares[idx];
    if (value === 'S'){
      sequences = this.getS_Sequences(idx);
    } else if (value === 'O'){
      sequences = this.getO_Sequences(idx);
    }
    return sequences;
  }

  private getS_Sequences(idx: number): sosSeq[] {
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    const sequences: sosSeq[] = [];
    console.log(`row ${row}, and column ${col}, checking (${row-1},${col-1}) and (${row+1},${col+1})`);
    if (this.checkSquare(row - 1, col - 1, 'O') && this.checkSquare(row - 2, col - 2, 'S')){
      sequences.push([this.toIdx(row - 1, col - 1), idx, this.toIdx(row - 2, col - 2)]);
    }
    if (this.checkSquare(row + 1, col + 1, 'O') && this.checkSquare(row + 2, col + 2, 'S')){
      sequences.push([this.toIdx(row + 1, col + 1), idx, this.toIdx(row + 2, col + 2)]);
    }
    if (this.checkSquare(row - 1, col + 1, 'O') && this.checkSquare(row - 2, col + 2, 'S')){
      sequences.push([this.toIdx(row - 1, col + 1), idx, this.toIdx(row - 2, col + 2)]);
    }
    if (this.checkSquare(row + 1, col - 1, 'O') && this.checkSquare(row + 2, col - 2, 'S')){
      sequences.push([this.toIdx(row + 1, col - 1), idx, this.toIdx(row + 2, col - 2)]);
    }
    if (this.checkSquare(row + 1, col, 'O') && this.checkSquare(row + 2, col, 'S')){
      sequences.push([this.toIdx(row + 1, col), idx, this.toIdx(row + 2, col)]);
    }
    if (this.checkSquare(row - 1, col, 'O') && this.checkSquare(row - 2, col, 'S')){
      sequences.push([this.toIdx(row - 1, col), idx, this.toIdx(row - 2, col)]);
    }
    if (this.checkSquare(row, col - 1, 'O') && this.checkSquare(row, col - 2, 'S')){
      sequences.push([this.toIdx(row, col - 1), idx, this.toIdx(row, col - 2)]);
    }
    if (this.checkSquare(row, col + 1, 'O') && this.checkSquare(row, col + 2, 'S')){
      sequences.push([this.toIdx(row, col + 1), idx, this.toIdx(row, col + 2)]);
    }
    return sequences;
  }
  
  private getO_Sequences(idx: number): sosSeq[] {
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    const sequences: sosSeq[] = [];
    if (this.checkSquare(row - 1, col - 1, 'S') && this.checkSquare(row + 1, col + 1, 'S')){
      sequences.push([this.toIdx(row - 1, col - 1), idx, this.toIdx(row + 1, col + 1)]);
    }
    if (this.checkSquare(row - 1, col + 1, 'S') && this.checkSquare(row + 1, col - 1, 'S')){
      sequences.push([this.toIdx(row - 1, col + 1), idx, this.toIdx(row + 1, col - 1)]);
    }
    if (this.checkSquare(row, col - 1, 'S') && this.checkSquare(row, col + 1, 'S')){
      sequences.push([this.toIdx(row, col - 1), idx, this.toIdx(row, col + 1)]);
    }
    if (this.checkSquare(row - 1, col, 'S') && this.checkSquare(row + 1, col, 'S')){
      sequences.push([this.toIdx(row - 1, col), idx, this.toIdx(row + 1, col)]);
    }
    return sequences;
  }

  private checkSquare(row: number, col: number, value: string): boolean {
    if (row >= 0 && row < 6 && col >= 0 && col < 6){
      const idx = this.toIdx(row, col);
      if (this.state.squares[idx] === value){
        return true;
      }
      return false;
    }
    return false;
  }

  private toIdx(row: number, col: number): number {
    return (row * 6) + col;
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