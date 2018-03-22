import classNames from 'classnames';
import update from 'react-addons-update';
import React, { Component } from 'react';
import Row from './Row';
import styles from './Table.module.css';


export default class Table extends Component {
  constructor() {
    super();
    this.timeout = undefined; // hz mojno li tak hranit
    this.state = {
      targX: undefined,
      targY: undefined,
      offLeft: undefined,
      offTop: undefined,
      unicKey: 20,
      list: [
        { rowId: 0, data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] }, // norm?
        { rowId: 5, data: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }] },
        { rowId: 10, data: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }] },
        { rowId: 15, data: [{ id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }] },
      ],
      hiddenCol: true,
      hiddenRow: true,
      dispR: true,
      dispC: true,
    };
    this.addCol = this.addCol.bind(this);
    this.addRow = this.addRow.bind(this);
    this.remCol = this.remCol.bind(this);
    this.remRow = this.remRow.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  addCol() {
    const listCp = this.state.list.slice();
    listCp.forEach((x, i) => x.data.push({ id: this.state.unicKey + i }));
    this.setState({ list: listCp, unicKey: this.state.unicKey + listCp.length });
  }
  addRow() {
    const listCp = update(this.state.list, {
      $push:
      [{
        rowId: this.state.unicKey + 1,
        data: this.state.list[0].data.map((x, i) => ({ id: this.state.unicKey + i })),
      }],
    });
    this.setState({ unicKey: this.state.unicKey + listCp[0].data.length, list: listCp });
  }
  remCol() {
    const listCp = this.state.list.slice();
    listCp.forEach(x => x.data.splice(this.state.targX, 1));
    this.setState({
      list: listCp,
      dispC: false,
      targX: undefined,
      offLeft: undefined,
    });
  }
  remRow() {
    const listCp = this.state.list.slice();
    listCp.splice(this.state.targY, 1);
    this.setState({
      list: listCp,
      dispR: false,
      targX: undefined,
      offLeft: undefined,
    });
  }
  mouseOver(e) {
    if (!e.target.className.includes(styles.button_add)) {
      clearTimeout(this.timeout);
      if (this.state.list[0].data.length > 1) {
        this.setState({ hiddenCol: false, dispC: true });
      }
      if (this.state.list.length > 1) {
        this.setState({ hiddenRow: false, dispR: true });
      }
      if (e.target.className === styles.block) { // если класс !только! блок
        this.setState({
          targX: Array.prototype.indexOf.call(e.target.parentNode.childNodes, e.target),
          targY: Array.prototype.indexOf.call(e.target.parentNode.parentNode.childNodes, e.target.parentNode),
          offTop: e.target.offsetTop,
          offLeft: e.target.offsetLeft,
        });
      }
    }
  }
  mouseOut() {
    this.timeout = setTimeout(() => {
      this.setState({ hiddenCol: true, hiddenRow: true });
    }, 1000);
  }

  render() {
    const remRowClasses = classNames(
      styles.block,
      styles.button_remove,
      styles.button_remrow,
      { [styles.button_hidden]: this.state.hiddenRow },
    );
    const remColClasses = classNames(
      styles.block,
      styles.button_remove,
      styles.button_remcol,
      { [styles.button_hidden]: this.state.hiddenCol },
    );
    const addRowButton = classNames(
      styles.block,
      styles.button_add,
      styles.button_addrow,
    );
    const addColButton = classNames(
      styles.block,
      styles.button_add,
      styles.button_addcol,
    );
    return (
      <div className={styles.comp_table} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.state.dispR &&
          <div className={remRowClasses} style={{ top: this.state.offTop }} onClick={this.remRow} />}
        {this.state.dispC &&
          <div className={remColClasses} style={{ left: this.state.offLeft }} onClick={this.remCol} />}
        <div className={addRowButton} onClick={this.addRow} />
        <div className={addColButton} onClick={this.addCol} />
        <div className={styles.table_body} >
          {this.state.list.map(x => (
            <Row key={x.rowId} data={x.data} />
            ))}

        </div>
      </div>
    );
  }
}
