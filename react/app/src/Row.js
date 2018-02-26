import React, { Component } from 'react';

const Block = () => (<div className="block"></div>);

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unic: 0,
      cells: [],
    };
  }
  componentDidMount() {
    this.fill();
  }

  componentWillReceiveProps(nextProps) {
    this.removeCol(nextProps);
    this.fill(nextProps);
  }
  fill(nextProps) {
    const cellsProp = nextProps === undefined ? this.props.cells : nextProps.cells;
    let unicCp = this.state.unic + 1;
    const cellsCp = this.state.cells;
    for (let i = cellsCp.length; i < cellsProp; i += 1) {
      cellsCp.push(<Block key={unicCp} />);
      unicCp += 1;
    }
    this.setState({ cells: cellsCp, unic: unicCp });
  }
  removeCol(nextProps) {
    const cellsCp = this.state.cells;
    cellsCp.splice(nextProps.targ, 1);
    this.setState({ cells: cellsCp });
  }
  render() {
    return (
      <div className="row" >{this.state.cells}</div>
    );
  }
}
