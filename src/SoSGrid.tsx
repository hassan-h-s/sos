import React, { useEffect, useRef, useState } from "react";
import { Grid, } from "@material-ui/core";
import Square from "./Square";

type sosSeq = [number, number, number];

type GridProps = {
  onSOS: () => void;
  onGridFull: () => void;
  onTurnEnd: () => void;
}

function SoSGrid(props: GridProps) {
  const gridIndices = generateIndices(6);
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

  function updateGrid() {
    if(!sosCheckAndUpdate(index.current) && index.current > -1){
      props.onTurnEnd();
    }
    if (gridIsFull()){
      props.onGridFull();
    }
  }

  function handleSquareChange(idx: number, value: string): void {
    let currentSq = [...squares];
    currentSq[idx] = value;
    setSquares(prevSq => currentSq);
    index.current = idx;
  }

  function sosCheckAndUpdate(idx: number): boolean {
    const sequences = findSequences(idx);
    if (sequences.length){
      sequences.forEach((s) => {
        props.onSOS();
      });
      return true;
    }
    return false;
  }

  function findSequences(idx: number): sosSeq[] {
    let sequences: sosSeq[] = [];
    const value = squares[idx];
    if (value === 'S'){
      sequences = getS_Sequences(idx);
    } else if (value === 'O'){
      sequences = getO_Sequences(idx);
    }
    return sequences;
  }

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

  function gridIsFull(): boolean {
    return [...squares].indexOf(null) === -1;
  }

}

function generateIndices(size: number): number[] {
  const indices: number[] = [];
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      indices.push((i * size) + j);
    }
  }
  return indices;
}

function toIdx(row: number, col: number): number {
  return (row * 6) + col;
}

export default SoSGrid;