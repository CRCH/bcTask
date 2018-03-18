import React, { Component } from 'react';

const Block = () => (<div className="block" />);

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unic: 0,
      cells: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ cells: this.state.cells.splice(nextProps.remCol, 1) });
  }
  render() {
    
    return (
      <div className="row" >{this.state.cells}</div>
    );
  }
}
