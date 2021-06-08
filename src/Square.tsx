import React, { useState } from "react";
import './Square.css';

type SqProps = {
  idx: number
  onValueChange: (idx: number, value: string) => void;
}

function Square (props: SqProps) {
  const [value, setValue] = useState<null | string>(null);
  return (
    <button className="square"
            onClick={handleClick}
            onContextMenu={handleRightClick}>{value}</button>
  );
  
  function handleClick() {
    if(!value){
      setValue('S');
      props.onValueChange(props.idx, 'S');
    }
  }

  function handleRightClick(e: React.MouseEvent) {
    e.preventDefault();
    if(!value){
      setValue('O');
      props.onValueChange(props.idx, 'O');
    }
  }
}

export default Square;