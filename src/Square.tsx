import React from "react";
import './Square.css';

interface ISqProps {
  idx: number
  onValueChange: (idx: number, value: string) => void;
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
      <button className="square"
              onClick={this.handleClick}
              onContextMenu={this.handleRightClick}>{this.state.value}</button>
    );
  }

  private handleClick = () => {
    if(!this.state.value){
      this.setState({value: 'S'});
      this.props.onValueChange(this.props.idx, 'S');
    }
  }

  private handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(!this.state.value){
      this.setState({value: 'O'});
      this.props.onValueChange(this.props.idx, 'O');
    }
  }
}

export default Square;