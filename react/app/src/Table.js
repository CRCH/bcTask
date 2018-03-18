import React, { Component } from 'react';
import Row from './Row';

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
  render() {
    
    return (
        <div className="comp_table" onMouseOver={e => this.mouseOver(e)} onMouseOut={e => this.mouseOut(e)} onTouchStart={e => this.mouseOver(e)}>
          {this.state.dispR &&
          <div className={['block button_remove button_remrow', this.state.hiddenRow ? 'button_hidden' : ''].join(' ')} style={{ top: this.state.offTop }} onClick={this.remRow.bind(this)} />}
          {this.state.dispC &&
          <div className={['block button_remove button_remcol', this.state.hiddenCol ? 'button_hidden' : ''].join(' ')} style={{ left: this.state.offLeft }} onClick={this.remCol.bind(this)} />}
          <div className="block button_add button_addrow" onClick={this.addRow.bind(this)} />
          <div className="block button_add button_addcol" onClick={this.addCol.bind(this)} />
          <div className="table_body">
            {this.state.list}
          </div>
        </div>
    );
  }
}
