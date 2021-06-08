import React, { useState } from "react";
import './Square.css';

type SqProps = {
  idx: number
  onValueChange: (idx: number, value: string) => void;
}

function Square (props: SqProps): JSX.Element {
  const [value, setValue] = useState<null | string>(null);
  return (
    <button className="square"
            onClick={handleClick}
            onContextMenu={handleRightClick}>{value}</button>
  );
  
  /**
   * Sets the state value of the square component on click
   */
  function handleClick(): void {
    if(!value){
      setValue('S');
      props.onValueChange(props.idx, 'S');
    }
  }

  /**
   * Sets the state value of the square component on right click. 
   * Disables default browser context menu
   */
  function handleRightClick(e: React.MouseEvent): void {
    e.preventDefault();
    if(!value){
      setValue('O');
      props.onValueChange(props.idx, 'O');
    }
  }
}

export default Square;