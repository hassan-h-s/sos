import React, { useEffect, useRef, useState } from "react";
import { Grid, } from "@material-ui/core";
import Square from "./Square";

type sosSeq = [number, number, number];

type GridProps = {
  onSOS: () => void;
  onGridFull: () => void;
  onTurnEnd: () => void;
}

function SoSGrid(props: GridProps): JSX.Element {
  const gridIndices = generateGridIndices(6);
  const [squares, setSquares] = useState(Array(36).fill(null)); 
  const index = useRef(-1); 

  useEffect(() => {
    updateGrid();
  }, [squares]);
  
  return (
    <Grid container spacing={0}>
      {gridIndices.map((id) => {
        return <Square key={id} 
                        idx={id}
                        onValueChange={handleSquareChange}/>
      })}
    </Grid>
  );

  /**
   * Gets new sequences in the grid. 
   * If none, call onTurnEnd. If exists, call onSoS.
   * Check if grid is full.
   */
  function updateGrid(): void {
    const seq = getSequences(index.current);
    if (!seq.length && index.current > -1){
      props.onTurnEnd();
    } else if (seq.length) { 
      seq.forEach((s) => props.onSOS());
    }
    if (gridIsFull()){
      props.onGridFull();
    }
  }

  /**
   * set state to update value of the changed square
   */
  function handleSquareChange(idx: number, value: string): void {
    let currentSq = [...squares];
    currentSq[idx] = value;
    setSquares(prevSq => currentSq);
    index.current = idx;
  }

  /**
   * Checks for sequences of SOS
   */
  function getSequences(idx: number): sosSeq[] {
    let sequences: sosSeq[] = [];
    const value = squares[idx];
    if (value === 'S'){
      sequences = getS_Sequences(idx);
    } else if (value === 'O'){
      sequences = getO_Sequences(idx);
    }
    return sequences;
  }

  /**
   * When modified square is 'S', check for all combinations of "O-S", diagonally, vertically, and horizontally
   */
  function getS_Sequences(idx: number): sosSeq[] {
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    const sequences: sosSeq[] = [];
    if (checkSquare(row - 1, col - 1, 'O') && checkSquare(row - 2, col - 2, 'S')){
      sequences.push([toIdx(row - 1, col - 1), idx, toIdx(row - 2, col - 2)]);
    }
    if (checkSquare(row + 1, col + 1, 'O') && checkSquare(row + 2, col + 2, 'S')){
      sequences.push([toIdx(row + 1, col + 1), idx, toIdx(row + 2, col + 2)]);
    }
    if (checkSquare(row - 1, col + 1, 'O') && checkSquare(row - 2, col + 2, 'S')){
      sequences.push([toIdx(row - 1, col + 1), idx, toIdx(row - 2, col + 2)]);
    }
    if (checkSquare(row + 1, col - 1, 'O') && checkSquare(row + 2, col - 2, 'S')){
      sequences.push([toIdx(row + 1, col - 1), idx, toIdx(row + 2, col - 2)]);
    }
    if (checkSquare(row + 1, col, 'O') && checkSquare(row + 2, col, 'S')){
      sequences.push([toIdx(row + 1, col), idx, toIdx(row + 2, col)]);
    }
    if (checkSquare(row - 1, col, 'O') && checkSquare(row - 2, col, 'S')){
      sequences.push([toIdx(row - 1, col), idx, toIdx(row - 2, col)]);
    }
    if (checkSquare(row, col - 1, 'O') && checkSquare(row, col - 2, 'S')){
      sequences.push([toIdx(row, col - 1), idx, toIdx(row, col - 2)]);
    }
    if (checkSquare(row, col + 1, 'O') && checkSquare(row, col + 2, 'S')){
      sequences.push([toIdx(row, col + 1), idx, toIdx(row, col + 2)]);
    }
    return sequences;
  }

  /**
   * When modified square is 'O', check for 'S on both sides, diagonally, vertically, and horizontally
   */
  function getO_Sequences(idx: number): sosSeq[] {
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    const sequences: sosSeq[] = [];
    if (checkSquare(row - 1, col - 1, 'S') && checkSquare(row + 1, col + 1, 'S')){
      sequences.push([toIdx(row - 1, col - 1), idx, toIdx(row + 1, col + 1)]);
    }
    if (checkSquare(row - 1, col + 1, 'S') && checkSquare(row + 1, col - 1, 'S')){
      sequences.push([toIdx(row - 1, col + 1), idx, toIdx(row + 1, col - 1)]);
    }
    if (checkSquare(row, col - 1, 'S') && checkSquare(row, col + 1, 'S')){
      sequences.push([toIdx(row, col - 1), idx, toIdx(row, col + 1)]);
    }
    if (checkSquare(row - 1, col, 'S') && checkSquare(row + 1, col, 'S')){
      sequences.push([toIdx(row - 1, col), idx, toIdx(row + 1, col)]);
    }
    return sequences;
  }

  /**
   * Helper function to get the current value of neighboring squares 
   */
  function checkSquare(row: number, col: number, value: string): boolean {
    if (row >= 0 && row < 6 && col >= 0 && col < 6){
      const idx = toIdx(row, col);
      if ([...squares][idx] === value){
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Check if grid is full, i.e. no null 
   */
  function gridIsFull(): boolean {
    return [...squares].indexOf(null) === -1;
  }
}


/**
 * Generates 0-35 indices for a 6x6 grid 
 */
function generateGridIndices(size: number): number[] {
  const indices: number[] = [];
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      indices.push((i * size) + j);
    }
  }
  return indices;
}

/**
 * Helper function to convert index back to row/col coordinates
 */
function toIdx(row: number, col: number): number {
  return (row * 6) + col;
}

export default SoSGrid;