import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Block = () => (<div className="block" />);

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unic: 0,
      cells: [],
    };
  }
  componentWillMount() {
    this.fill();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colRem !== undefined) {
      this.removeCol(nextProps);
    } else this.fill(nextProps);
  }
  fill(nextProps) {
    const cellsProp = nextProps === undefined ? this.props.cells : nextProps.cells;
    let unicCp = this.state.unic + 1;
    const cellsCp = this.state.cells.slice();
    for (let i = cellsCp.length; i < cellsProp; i += 1) {
      cellsCp.push(<Block key={unicCp} />);
      unicCp += 1;
    }
    this.setState({ cells: cellsCp, unic: unicCp });
  }
  removeCol(nextProps) {
    const cellsCp = this.state.cells.slice();
    cellsCp.splice(nextProps.colRem, 1);
    this.setState({ cells: cellsCp });
  }
  render() {
    return (
      <div className="row" >{this.state.cells}</div>
    );
  }
}
Row.propTypes = {
  cells: PropTypes.number,
  colRem: PropTypes.number,
};
Row.defaultProps = {
  cells: undefined,
  colRem: undefined,
};
