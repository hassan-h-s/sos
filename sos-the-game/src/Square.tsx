import React from "react";
import './Square.css';

interface ISqProps {
  idx: number
}

interface ISqState {
  value: string | null
}

class Square extends React.Component<ISqProps, ISqState> {
  constructor(props: ISqProps){
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={()=> this.setState({value: this.state.value === 'S' ? 'O' : 'S'})}>{this.state.value}</button>
    );
  }
}

export default Square;