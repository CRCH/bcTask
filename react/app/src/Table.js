import classNames from 'classnames';
import React, { Component } from 'react';
import Row from './Row';


export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      targRow: undefined,
      targCol: undefined,
      colRem: undefined,
      unicKey: 0,
      numCols: 4,
      numRows: 4,
      list: [],
      hiddenCol: true,
      hiddenRow: true,
      dispR: true,
      dispC: true,
    };
  }
  componentWillMount() {
    this.fillTable();
  }
  fillTable() {
    let unicCopy = this.state.unicKey;
    const listCopy = this.state.list.slice();
    for (let i = listCopy.length; i < this.state.numRows; i += 1) {
      listCopy.push(<Row key={unicCopy} cells={this.state.numCols} colRem={this.state.colRem} />);
      unicCopy += 1;
    }
    this.setState({ unicKey: unicCopy, list: listCopy });
  }
  addCol() {
    const numColsCp = this.state.numCols + 1;
    const listPrep = this.state.list.map(x => React.cloneElement(x, { cells: numColsCp, colRem: undefined }));
    this.setState({ numCols: numColsCp, list: listPrep });
  }
  addRow() {
    const listCp = this.state.list.slice();
    listCp.push(<Row key={this.state.unicKey + 1} cells={this.state.numCols} />);
    this.setState({ numRows: this.state.numRows + 1, unicKey: this.state.unicKey + 1, list: listCp });
  }
  remCol() {
    const list = this.state.list.slice();
    const newList = list.map(x => React.cloneElement(x, { cells: this.state.numCols - 1, colRem: this.state.targCol }));
    this.setState({ numCols: this.state.numCols - 1, list: newList, dispC: false });
  }
  remRow() {
    const newList = this.state.list.slice();
    newList.splice(this.state.targRow, 1);
    this.setState({
      list: newList,
      numRows: this.state.numRows - 1,
      dispR: false,
    });
  }
  mouseOver(e) {
    if (!e.target.className.includes('button_add')) {
      if (this.state.numCols > 1) {
        this.setState({ hiddenCol: false, dispC: true });
      }
      if (this.state.numRows > 1) {
        this.setState({ hiddenRow: false, dispR: true });
      }
      if (e.target.className === 'block') {
        const targX = Array.prototype.indexOf.call(e.target.parentNode.childNodes, e.target);
        const targY = Array.prototype.indexOf.call(e.target.parentNode.parentNode.childNodes, e.target.parentNode);
        this.setState({
          offTop: e.target.offsetTop,
          offLeft: e.target.offsetLeft,
          targRow: targY,
          targCol: targX,
        });
      }
    }
  }
  mouseOut() {
    this.setState({ hiddenCol: true, hiddenRow: true });
  }

  render() {
    const remRowClasses = classNames(
      'block',
      'button_remove',
      'button_remrow',
      { button_hidden: this.state.hiddenRow },
    );
    const remColClasses = classNames(
      'block',
      'button_remove',
      'button_remcol',
      { button_hidden: this.state.hiddenCol },
    );
    return (
      <div className="comp_table" onMouseOver={this.mouseOver.bind(this)} onMouseOut={e => this.mouseOut(e)} onTouchStart={e => this.mouseOver(e)}>
        {this.state.dispR &&
          <div className={remRowClasses} style={{ top: this.state.offTop }} onClick={this.remRow.bind(this)} />}
        {this.state.dispC &&
          <div className={remColClasses} style={{ left: this.state.offLeft }} onClick={this.remCol.bind(this)} />}
        <div className="block button_add button_addrow" onClick={this.addRow.bind(this)} />
        <div className="block button_add button_addcol" onClick={this.addCol.bind(this)} />
        <div className="table_body">
          {this.state.list}
        </div>
      </div>
    );
  }
}
