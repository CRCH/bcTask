import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Block = () => {
    return(
      <div className="block"></div>
    );
  }

class Row extends Component{
  
  constructor(props){
    super(props);
  this.state = {
    unic: 0,
    cells: [],
    delete: false
  }
  
  }
  fill(nextProps){
    let cellsProp = nextProps === undefined ? this.props.cells : nextProps.cells;
    let unicCp = this.state.unic+1;
    let cellsCp = this.state.cells;
    for(let i = cellsCp.length; i < cellsProp; i += 1){
      cellsCp.push(<Block key={unicCp}/>)
      unicCp += 1
    }
    this.setState({cells: cellsCp, unic: unicCp})
  }
  componentDidMount(){
    this.fill()
  }

  componentWillReceiveProps(nextProps){
    this.removeCol(nextProps)
    this.fill(nextProps)
  }
  
  removeCol(nextProps){
    let cellsCp = this.state.cells;
    cellsCp.splice(nextProps.targ,1)
    this.setState({cells: cellsCp})
  }
  render(){
    return(
      <div className="row" >{this.state.cells}</div>
    );
  }
}

class Table extends Component{
  constructor(){
    super();
    this.state = {
      targ: 0,
      unicKey: 0,
      numCols: 4,
      numRows: 4,
      list:[],
      hiddenCol: true,
      hiddenRow: true,
      dispR: true,
      dispC: true
    };
    
  }
  componentDidMount(){
    this.fillTable()
  }
  fillTable(){
    let unicCopy = this.state.unicKey;
    let listCopy = this.state.list;
    for(let i = listCopy.length; i < this.state.numRows; i += 1){
      listCopy.push(<Row key={unicCopy} cells={this.state.numCols}/>)
      unicCopy += 1
    }
    this.setState({unicKey: unicCopy, list: listCopy})
  }
  addCol(){
    let numColsCp = this.state.numCols+1;
    let list = this.state.list;
    let listPrep = list.map(x => React.cloneElement(x,{cells: numColsCp}))
    this.setState({numCols:numColsCp,list: listPrep});
    
  }
  addRow(){
    let num = this.state.numRows+1;
    let unic = this.state.unicKey +1; 
    let listCp = this.state.list; 
    listCp.push(<Row key={unic} cells={this.state.numCols}/>)
    this.setState({numRows: num, unicKey: unic, list:listCp})
    
  }
  remCol(){
    let numColsCp = this.state.numCols-1;
    let list = this.state.list;
    let targ = this.state.targ;
    let listPrep = list.map(x => React.cloneElement(x,{cells: numColsCp, colRem: targ}))
    this.setState({numCols:numColsCp,list: listPrep,dispC:false});
  }
  remRow(){
    let target = this.state.targ;
    this.state.numRows -= 1;
    this.state.list.splice(target,1)
    this.setState({numRows: this.state.numRows,targ: 0,dispR:false})
  }
  mouseOver(e){
    if(!e.target.className.includes("button_add")){    
    if(this.state.numCols > 1 ){
      this.setState({hiddenCol:false, dispC:true})
      
    }
    if(this.state.numRows > 1){
      this.setState({hiddenRow:false, dispR:true})
    }
    if(e.target.className === "block"){
    this.setState({offTop:e.target.offsetTop, offLeft: e.target.offsetLeft})
    }
  }

  }
  mouseOut(e){
    this.setState({hiddenCol:true,hiddenRow:true})
  }
  render(){
    return(
      <div className="comp_table" onMouseOver={(e)=>this.mouseOver(e)} onMouseOut={(e)=>this.mouseOut(e)} onTouchStart={(e)=>this.mouseOver(e)}>
        {this.state.dispR && 
        <div className={["block button_remove button_remrow",this.state.hiddenRow?"button_hidden":""].join(' ')} style ={{top: this.state.offTop}} onClick={this.remRow.bind(this)}></div>}
        {this.state.dispC && 
        <div className={["block button_remove button_remcol",this.state.hiddenCol?"button_hidden":""].join(' ')} style ={{left: this.state.offLeft}} onClick={this.remCol.bind(this)}></div>}
        <div className="block button_add button_addrow" onClick={this.addRow.bind(this)}></div>
        <div className="block button_add button_addcol" onClick={this.addCol.bind(this)}></div>
        <div className="table_body">
          {this.state.list} 
        </div>  
      </div> 
  );
  
} 
}
class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div>
      <Table/>
      <Table/>
      </div>
    );
  }
}

export default App;
